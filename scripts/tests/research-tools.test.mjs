import { test } from "node:test";
import assert from "node:assert/strict";
import { parseNewsRss, mergeCandidates, isAlreadyPublished, normalizeUrl, isRelevantCandidate } from "../lib/candidate-discovery.mjs";
import { checkMunicipality, findEndSignals } from "../lib/municipality-health.mjs";
import { buildMunicipalityScaffold } from "../lib/municipality-scaffold.mjs";
import { validateResearchUrl, isPublicAddress, fetchResearchPage, parseResearchHtml } from "../lib/research-http.mjs";
import { readResearchModel, checkMunicipalityTypes, validateMunicipalityData } from "../lib/research-model.mjs";
import { readPublishedMunicipalities } from "../lib/published-data.mjs";

test("RSS deduplication excludes closed municipalities and preserves manual review on re-runs", () => {
  const xml = `<rss><channel><item><title>西川町 デジタル住民票</title><link>https://news.google.com/rss/articles/old</link></item><item><title>試験村 デジタル村民</title><link>https://news.google.com/rss/articles/new?utm_source=test</link><description><![CDATA[<p>新潟県のテスト用記事</p>]]></description><pubDate>Wed, 11 Nov 2026 00:00:00 GMT</pubDate><source url="https://example.com/">試験媒体</source></item></channel></rss>`;
  const records = [{ municipality: "西川町", prefecture: "山形県", officialUrl: "https://example.com/closed/", status: "終了" }];
  const parsed = parseNewsRss(xml, "デジタル村民", ["山形県", "新潟県"], new Date("2026-11-12T00:00:00Z"));
  const first = mergeCandidates([], parsed, records);
  assert.equal(first.length, 1);
  assert.equal(first[0].prefecture, "新潟県");
  assert.equal(first[0].officialUrl, null);
  first[0].reviewStatus = "保留";
  first[0].reviewNotes = "手動記録";
  const second = mergeCandidates(first, parsed.map(c => ({ ...c, keywords: ["デジタル市民"] })), records);
  assert.equal(second.length, 1);
  assert.equal(second[0].reviewNotes, "手動記録");
  assert.equal(second[0].reviewStatus, "保留");
  assert.deepEqual(second[0].keywords, ["デジタル村民", "デジタル市民"]);
  assert.equal(isAlreadyPublished({ title: "別名", articleUrl: "https://example.com/closed/?utm_source=test#top" }, records), true);
  assert.equal(mergeCandidates(first, [], [{ municipality: "試験村", prefecture: "新潟県", officialUrl: "https://example.com/new" }]).length, 0);
  assert.equal(normalizeUrl("javascript:alert(1)"), null);
  assert.throws(() => parseNewsRss("<html>Access denied</html>", "test", []));
  assert.equal(isRelevantCandidate({ title: "デジタル市民教育を学校に導入" }), false);
  assert.equal(isRelevantCandidate({ title: "NBA八村14得点 デジタル速報" }), false);
  assert.equal(isRelevantCandidate({ title: "試験村 デジタル村民証が登場" }), true);
  assert.equal(isRelevantCandidate({ title: "ふるさと住民登録制度の企業向けセミナー" }), false);
  assert.equal(isRelevantCandidate({ title: "試験町がふるさと住民登録制度の募集を開始" }), true);
});

test("health baseline distinguishes initial, new closure text, failure and URL replacement", async () => {
  const record = { municipality: "試験村", officialUrl: "https://example.com/program", status: "受付中", lastChecked: "2026-08-31" };
  const response = text => async () => ({ url: record.officialUrl, status: 200, contentType: "text/html", redirects: [], text: `<title>制度</title><main>${text}</main>` });
  const initial = await checkMunicipality(record, undefined, {}, response("募集受付中です"));
  assert.deepEqual(initial.warnings, []);
  assert.equal(initial.initialBaseline, true);
  const next = await checkMunicipality(record, initial, {}, response("募集を終了しました。ありがとうございました"));
  assert.ok(next.newSignals.length > 0);
  assert.match(next.warnings[0], /新しい/);
  const again = await checkMunicipality(record, next, {}, response("募集を終了しました。ありがとうございました"));
  assert.equal(again.newSignals.length, 0);
  assert.equal(again.alert, false);
  assert.equal(next.alert, true);
  const firstClosed = await checkMunicipality(record, undefined, {}, response("受付終了しました"));
  assert.equal(firstClosed.newSignals.length, 0);
  assert.match(firstClosed.warnings[0], /初回/);
  const failure = await checkMunicipality(record, next, {}, async () => { throw new Error("timeout"); });
  assert.equal(failure.lastSucceededAt, next.lastSucceededAt);
  assert.deepEqual(failure.baselineSignals, next.baselineSignals);
  const replaced = await checkMunicipality({ ...record, officialUrl: "https://example.com/new" }, initial, {}, response("募集を終了しました"));
  assert.equal(replaced.initialBaseline, true);
  assert.equal(record.lastChecked, "2026-08-31");
  assert.deepEqual(findEndSignals("受付終了していません"), []);
  assert.deepEqual(findEndSignals("販売終了が近い 販売終了が遅い"), []);
});

test("health checker catches HTTP errors, soft404 and PDFs without claiming content verification", async () => {
  const record = { municipality: "試験村", officialUrl: "https://example.com/program", status: "終了" };
  for (const status of [404, 500, 204]) {
    const result = await checkMunicipality(record, undefined, {}, async () => ({ status, url: record.officialUrl, redirects: [] }));
    assert.match(result.warnings[0], new RegExp(String(status)));
    assert.equal(result.lastSucceededAt, null);
  }
  const missing = await checkMunicipality(record, undefined, {}, async () => ({ status: 200, url: record.officialUrl, redirects: [], contentType: "text/html", text: "<title>ページが見つかりません</title><main>404</main>" }));
  assert.ok(missing.warnings.length);
  const pdf = await checkMunicipality(record, undefined, {}, async () => ({ status: 200, url: record.officialUrl, redirects: [], contentType: "application/pdf", text: "" }));
  assert.equal(pdf.analysis, "PDF本文未解析");
  assert.ok(pdf.warnings.length);
});

test("research HTTP rejects internal, authenticated and downgraded redirect URLs", async () => {
  for (const url of ["http://example.com", "https://localhost/", "https://127.0.0.1/", "https://[::1]/", "https://user:pass@example.com/", "https://example.com:8443/"]) assert.throws(() => validateResearchUrl(url));
  for (const address of ["10.0.0.1", "127.0.0.1", "169.254.169.254", "192.168.1.1", "100.64.0.1", "::1", "fc00::1", "::ffff:127.0.0.1", "2001:db8::1"]) assert.equal(isPublicAddress(address), false, address);
  assert.equal(isPublicAddress("8.8.8.8"), true);
  assert.equal(isPublicAddress("2606:4700:4700::1111"), true);
  await assert.rejects(fetchResearchPage("https://example.com", {}, async () => ({ status: 302, headers: { location: "https://127.0.0.1/private" }, bytes: Buffer.alloc(0) })), /公開HTTPS/);
  const html = parseResearchHtml("<title>制度</title><meta name='description' content='テストの概要'><main>本文</main><script>受付終了</script>");
  assert.equal(html.text, "本文");
  assert.equal(html.summary, "テストの概要");
});

test("scaffold uses exact Municipality schema, canonical regions and existing licensed stocks", async () => {
  const model = await readResearchModel();
  const existing = await readPublishedMunicipalities();
  const page = { title: "試験村 デジタル会員NFT", heading: "試験村 デジタル会員NFT", identityText: "沖縄県 試験村", summary: "試験用の概要" };
  const { record, review } = buildMunicipalityScaffold({ name: "試験村", page, url: "https://example.com/program", model, existing, date: "2026-11-12" });
  assert.equal(record.region, "九州・沖縄");
  assert.equal(record.prefecture, "沖縄県");
  assert.equal(record.status, "要確認");
  assert.equal(record.priceNumber, undefined);
  assert.deepEqual(record.benefits, []);
  assert.equal(record.lastChecked, "2026-11-12");
  assert.equal(record.imagePermissionStatus, "free-stock");
  assert.ok(model.stocks.some(stock => stock.src === record.imageUrl));
  assert.deepEqual(checkMunicipalityTypes([record]), []);
  assert.ok(review.reviewRequired.length > 0);
  const unknown = buildMunicipalityScaffold({ name: "山古志", page: { ...page, identityText: "地域" }, url: "https://example.com/program", model, existing });
  assert.equal(unknown.record.prefecture, "要確認");
  assert.throws(() => buildMunicipalityScaffold({ name: "試験村", slug: "../bad", page, url: "https://example.com/program", model, existing }));
});

test("validator checks raw schema, category typos, duplicates, image duplicates and future dates", async () => {
  const model = await readResearchModel();
  const records = await readPublishedMunicipalities();
  const good = await validateMunicipalityData(records, model);
  assert.deepEqual(good.errors, []);
  assert.ok(good.warnings.some(w => w.includes("画像共用")));
  const bad = structuredClone(records[0]);
  delete bad.programName;
  bad.benefitCategories = ["tourisum"];
  bad.lastChecked = "2999-01-01";
  const result = await validateMunicipalityData([...records, bad], model);
  for (const term of ["programName", "slug重複", "tourisum", "lastChecked"]) assert.ok(result.errors.some(error => error.includes(term)), term);
  const current = records.find(m => m.isFeatured && m.status !== "終了");
  const copy = { ...current, id: "test-copy", slug: "test-copy", municipality: "試験村", imageUrl: model.getMunicipalityImage(current).src, imagePermissionStatus: "free-stock", imageCredit: "test", imageSourceUrl: "https://example.com/image", imageAlt: "試験画像" };
  assert.ok((await validateMunicipalityData([...records, copy], model)).errors.some(error => error.includes("注目の制度")));
});

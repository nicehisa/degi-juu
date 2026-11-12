import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
import { readPublishedMunicipalities } from "../lib/published-data.mjs";
import { auditInformationDates, isDateOnly } from "../lib/municipality-date-audit.mjs";

async function importTypeScript(path) {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
  return import("data:text/javascript;base64," + Buffer.from(outputText).toString("base64"));
}

test("information dates reject invalid, missing, future and non-canonical dates", () => {
  assert.equal(isDateOnly("2024-02-29"), true);
  for (const value of ["2026-02-29", "2026-02-30", "2026-13-01", "2026-8-31", "2026/08/31", "2026-08-31T00:00:00Z", "", null]) assert.equal(isDateOnly(value), false);
  const records = [
    { id: "future", lastChecked: "2026-11-13" },
    { id: "missing" },
    { id: "alias", lastChecked: "2026-08-31", verifiedAt: "2026/08/31" },
    { id: "before-created", lastChecked: "2026-08-31", createdAt: "2026-09-01" },
  ];
  const result = auditInformationDates(records, "2026-11-12");
  assert.equal(result.errors.length, 3);
  assert.equal(result.warnings.length, 1);
});

test("all published information dates are valid as of today in Japan", async () => {
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date());
  const result = auditInformationDates(await readPublishedMunicipalities(), today);
  assert.ok(result.total > 0);
  assert.deepEqual(result.errors, []);
});

test("feature tags distinguish membership NFTs and low-cost vs unknown costs", async () => {
  const { getParticipationFeatures } = await importTypeScript("../../src/lib/participationFeatures.ts");
  const records = await readPublishedMunicipalities();
  const ishioka = getParticipationFeatures(records.find(m => m.id === "ishioka-ibaraki"));
  assert.equal(ishioka.isNft, true);
  assert.equal(ishioka.format, "会員証型");
  assert.equal(ishioka.priceTag, "1,000円以下");
  assert.equal(getParticipationFeatures(records.find(m => m.id === "toyama-toyama")).isNft, true);
  const base = { type: "アプリ型", programName: "地域ファンアプリ", status: "受付中" };
  assert.equal(getParticipationFeatures({ ...base, priceNumber: 0 }).priceTag, "参加費無料");
  assert.equal(getParticipationFeatures({ ...base, priceNumber: 1000 }).priceTag, "1,000円以下");
  for (const priceNumber of [undefined, -1, NaN, 1001]) assert.equal(getParticipationFeatures({ ...base, priceNumber }).priceTag, undefined);
  assert.equal(getParticipationFeatures({ ...base, status: "終了", priceNumber: 0 }).priceTag, "募集時無料");
  assert.equal(getParticipationFeatures(base).isNft, false);
});

test("FAQ JSON-LD uses the same exact questions and answers as page data", async () => {
  const { homeFaqs, faqs } = await importTypeScript("../../src/data/faqs.ts");
  const { buildFaqJsonLd, serializeJsonLd, buildBreadcrumbJsonLd, getOrganizationJsonLd } = await importTypeScript("../../src/lib/structuredData.ts");
  for (const entries of [homeFaqs, faqs]) {
    const schema = buildFaqJsonLd(entries, "https://digijuu.jp/faq#faq");
    assert.deepEqual(schema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })), entries);
  }
  const payload = { text: "</script><script>alert(1)</script>" };
  assert.equal(serializeJsonLd(payload).includes("<"), false);
  assert.deepEqual(JSON.parse(serializeJsonLd(payload)), payload);
  const crumbs = buildBreadcrumbJsonLd([{ name: "トップ", url: "https://digijuu.jp/" }, { name: "自治体一覧", url: "https://digijuu.jp/municipalities" }]);
  assert.deepEqual(crumbs.itemListElement.map(item => item.position), [1, 2]);
  assert.equal(getOrganizationJsonLd("https://digijuu.jp")["@id"], "https://digijuu.jp/#organization");
});

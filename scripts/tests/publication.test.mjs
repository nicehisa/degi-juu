import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchOfficialPage, buildAutoMunicipality } from "../lib/validate-candidate.mjs";
const url = "https://www.town.example.lg.jp/program/1";
const candidate = { prefecture: "山形県", municipality: "山形県試験町" };
const regions = [{ name: "東北", prefectures: ["山形県"] }];
const html = '<html><head><title>試験町デジタル住民票NFT | 試験町</title></head><body><h1>試験町公式サイト</h1><main>山形県試験町のデジタル住民票NFTは関係人口向けの制度です。</main></body></html>';
const fetcher = async () => new Response(html, { headers: { "content-type": "text/html" } });

test("government individual page creates a conservative record, then deduplicates by municipality", async () => {
  const page = await fetchOfficialPage(url, [], fetcher);
  const record = buildAutoMunicipality(candidate, page, [], regions);
  assert.equal(record.municipality, "試験町");
  assert.equal(record.region, "東北");
  assert.equal(record.status, "要確認");
  assert.equal(record.price, "公式ページで確認");
  assert.deepEqual(record.benefits, []);
  assert.match(record.slug, /^auto-[a-f0-9]{16}$/);
  assert.equal(buildAutoMunicipality(candidate, page, [record], regions), null);
});
test("HTTP404 and HTTP200 soft404 are both rejected", async () => {
  await assert.rejects(fetchOfficialPage(url, [], async () => new Response("", { status: 404 })), /HTTP 404/);
  await assert.rejects(fetchOfficialPage(url, [], async () => new Response('<title>ページが見つかりません</title><h1>デジタル住民票NFT</h1><main>お探しのページは削除されました</main>', { headers: { "content-type": "text/html" } })), /エラーページ/);
});
test("redirects to non-government hosts cannot be fetched", async () => {
  let calls = 0;
  await assert.rejects(fetchOfficialPage(url, [], async () => {
    calls++; return new Response(null, { status: 302, headers: { location: "http://127.0.0.1/admin" } });
  }), /公式ドメイン/);
  assert.equal(calls, 1);
});
test("homepages, statutory certificates and guessed municipality names cannot be published", async () => {
  await assert.rejects(fetchOfficialPage(url, [], async () => new Response('<h1>試験町公式サイト</h1><main>デジタル住民票NFTへ</main>', { headers: { "content-type": "text/html" } })), /個別ページ/);
  const statutory = await fetchOfficialPage(url, [], async () => new Response('<h1>デジタル住民票</h1><main>デジタル住民票をマイナポータルで交付します</main>', { headers: { "content-type": "text/html" } }));
  assert.throws(() => buildAutoMunicipality(candidate, statutory, [], regions), /地域参加型/);
  const page = await fetchOfficialPage(url, [], fetcher);
  assert.throws(() => buildAutoMunicipality({ prefecture: "山形県", municipality: "架空町" }, page, [], regions), /照合/);
  assert.throws(() => buildAutoMunicipality(candidate, { ...page, text: page.text + "税控除があります" }, [], regions), /個別確認/);
});

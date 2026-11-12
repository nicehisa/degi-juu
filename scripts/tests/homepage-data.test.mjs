import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import ts from "typescript";
import { readPublishedMunicipalities } from "../lib/published-data.mjs";

async function importTypeScript(relativePath) {
  const source = await readFile(new URL(relativePath, import.meta.url), "utf8");
  const result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
  return import("data:text/javascript;base64," + Buffer.from(result.outputText).toString("base64"));
}

test("NFT fan memberships and NFT resident programs match the same benefit filter", async () => {
  const { getBenefitCategoryIds } = await importTypeScript("../../src/data/benefitCategories.ts");
  const data = await readPublishedMunicipalities();
  for (const id of ["ishioka-ibaraki", "mashiko-tochigi", "toyama-toyama"]) {
    const record = data.find(m => m.id === id);
    assert.ok(record, id);
    assert.ok(getBenefitCategoryIds(record).includes("nft"), id);
  }
  const newlyAdded = { type: "デジタル住民NFT", programName: "地域会員証", benefitCategories: ["community", "nft"] };
  assert.deepEqual(getBenefitCategoryIds(newlyAdded), ["community", "nft"]);
  assert.deepEqual(getBenefitCategoryIds({ type: "アプリ型", programName: "地域アプリ", benefitCategories: ["info"] }), ["info"]);
});

test("featured image assets are distinct and each asset keeps its own attribution", async () => {
  const { getMunicipalityImage } = await importTypeScript("../../src/lib/municipalityImages.ts");
  const records = (await readPublishedMunicipalities()).filter(m => m.isFeatured && m.status !== "終了");
  const images = records.map(getMunicipalityImage);
  assert.equal(new Set(images.map(img => img.src)).size, images.length);
  for (const img of images) {
    await access(new URL("../../public" + img.src, import.meta.url));
    assert.ok(img.credit && img.sourceUrl && img.licenseUrl);
  }
  const mashiko = getMunicipalityImage(records.find(m => m.id === "mashiko-tochigi"));
  assert.equal(mashiko.credit, "Pixabay / DeltaWorks");
  assert.equal(mashiko.src, "/images/stock/japan-mountain-clouds.jpg");
});

test("researched additions keep canonical municipalities, reception caveats and non-NFT certificates", async () => {
  const records = await readPublishedMunicipalities();
  const ids = ["higashikawa-hokkaido", "ama-shimane", "kotohira-kagawa", "shiiba-miyazaki", "nagaoka-niigata"];
  for (const id of ids) {
    const item = records.find(record => record.id === id);
    assert.ok(item, id);
    assert.ok(["free-stock", "permitted"].includes(item.imagePermissionStatus));
    assert.ok(item.imageCredit && item.imageSourceUrl && item.imageAlt);
  }
  const yamakoshi = records.find(record => record.id === "nagaoka-niigata");
  assert.equal(yamakoshi.municipality, "長岡市");
  if (yamakoshi.applicationMethod.includes("新規販売を行っていない")) assert.equal(yamakoshi.status, "終了");
  const { getParticipationFeatures } = await importTypeScript("../../src/lib/participationFeatures.ts");
  const higashikawa = records.find(record => record.id === "higashikawa-hokkaido");
  assert.equal(getParticipationFeatures(higashikawa).isNft, false);
  for (const id of ["higashikawa-hokkaido", "kotohira-kagawa", "shiiba-miyazaki"]) {
    const item = records.find(record => record.id === id);
    if (item.price.includes("要確認")) {
      assert.equal(item.priceNumber, undefined);
      assert.equal(getParticipationFeatures(item).priceTag, undefined);
    }
  }
  for (const region of ["北海道", "四国", "中国"]) assert.ok(records.some(item => item.region === region), region);
  const recent = records.filter(record => record.status !== "終了").sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);
  assert.ok(recent.every(record => record.status !== "終了"));
  assert.ok(recent.every(record => !records.some(other => other.status !== "終了" && other.createdAt > recent[0].createdAt)));
});

test("reviewed statuses distinguish current paid plans, ended primary sales and uncertain fees", async () => {
  const records = await readPublishedMunicipalities();
  const find = id => records.find(record => record.id === id);
  for (const id of ["toyama-toyama", "ishioka-ibaraki"]) {
    const item = find(id);
    assert.equal(item.status, "販売中");
    assert.ok(item.notes.includes("本掲載は"));
    assert.equal(item.lastChecked, "2026-11-13");
  }
  const akitakata = find("akitakata-hiroshima");
  assert.equal(akitakata.status, "終了");
  assert.equal(akitakata.relatedUrl, "https://nft.hexanft.com/nftmaticmulti/61");
  assert.ok(akitakata.notes.includes("一次販売"));
  const { getParticipationFeatures } = await importTypeScript("../../src/lib/participationFeatures.ts");
  const shiiba = find("shiiba-miyazaki");
  assert.equal(shiiba.status, "販売中");
  assert.ok(shiiba.price.includes("0.015 ETH"));
  assert.equal(shiiba.priceNumber, undefined);
  assert.equal(getParticipationFeatures(shiiba).priceTag, undefined);
  assert.equal(shiiba.relatedUrl, "https://app.nishikigoinft.com/shiiba");
  const bandai = find("bandai-fukushima");
  assert.equal(bandai.status, "受付中");
  assert.equal(bandai.price, "要確認");
  assert.equal(bandai.priceNumber, undefined);
  assert.equal(getParticipationFeatures(bandai).priceTag, undefined);
  assert.ok(bandai.benefitConditions.includes("本人確認"));
  for (const id of ["higashikawa-hokkaido", "kotohira-kagawa"]) assert.equal(find(id).status, "要確認");
});

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

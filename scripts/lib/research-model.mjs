import { readFile, access } from "node:fs/promises";
import ts from "typescript";
import { readLiteralArray } from "./published-data.mjs";
import { fromRoot } from "./research-io.mjs";
import { isDateOnly } from "./municipality-date-audit.mjs";
import { japanDate } from "./check-program.mjs";

export async function readResearchModel() {
  const regions = await readLiteralArray("src/data/regions.ts", ["regions"]);
  const categories = await readLiteralArray("src/data/benefitCategories.ts", ["benefitCategories"]);
  const stocks = Object.values(await readLiteralArray("src/lib/municipalityImages.ts", ["stockImages"]));
  const source = await readFile(fromRoot("src/lib/municipalityImages.ts"), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
  const { getMunicipalityImage } = await import("data:text/javascript;base64," + Buffer.from(outputText).toString("base64"));
  return { regions, categories, stocks, getMunicipalityImage };
}

export function checkMunicipalityTypes(records) {
  const filename = fromRoot("__data_contract_validation__.ts");
  const source = `import type { Municipality } from "./src/data/municipalities";\nconst records = ${JSON.stringify(records, null, 2)} satisfies Municipality[];`;
  const config = ts.readConfigFile(fromRoot("tsconfig.json"), ts.sys.readFile);
  if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, " "));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, fromRoot("."));
  const options = { ...parsed.options, noEmit: true, incremental: false, types: [] };
  const host = ts.createCompilerHost(options);
  const read = host.readFile.bind(host);
  const exists = host.fileExists.bind(host);
  host.readFile = file => file === filename ? source : read(file);
  host.fileExists = file => file === filename || exists(file);
  const program = ts.createProgram([filename], options, host);
  return ts.getPreEmitDiagnostics(program).map(diagnostic => {
    const position = diagnostic.file && diagnostic.start !== undefined ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start) : undefined;
    return `${diagnostic.file?.fileName.split("/").pop() || "Municipality"}${position ? `:${position.line + 1}` : ""}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`;
  });
}

export async function validateMunicipalityData(records, model, { draftSlugs = new Set() } = {}) {
  const errors = checkMunicipalityTypes(records);
  const warnings = [];
  const ids = new Set(), slugs = new Set(), names = new Set();
  const categoryIds = new Set(model.categories.map(c => c.id));
  const images = new Map();
  for (const record of records) {
    if (!record || typeof record !== "object" || Array.isArray(record)) continue;
    const name = `${record.slug || "slug未設定"} (${record.municipality || "自治体未設定"})`;
    for (const key of ["id", "slug", "region", "prefecture", "municipality", "programName", "summary", "price", "status", "target", "benefitConditions", "applicationMethod", "officialUrl", "lastChecked", "createdAt", "updatedAt"]) {
      if (typeof record[key] !== "string" || !record[key].trim()) errors.push(`${name}: ${key} が空です`);
    }
    if (ids.has(record.id)) errors.push(`${name}: id重複`);
    if (slugs.has(record.slug)) errors.push(`${name}: slug重複`);
    ids.add(record.id); slugs.add(record.slug);
    if (typeof record.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug)) errors.push(`${name}: slug形式が不正です`);
    const identity = `${record.prefecture}/${record.municipality}`;
    if (names.has(identity)) errors.push(`${name}: 同じ都道府県・自治体が重複しています`);
    names.add(identity);
    const region = model.regions.find(r => r.prefectures.includes(record.prefecture));
    if (!region || region.name !== record.region) {
      const message = `${name}: 都道府県・地方区分を確認してください`;
      (draftSlugs.has(record.slug) && record.prefecture === "要確認" ? warnings : errors).push(message);
    }
    for (const field of ["officialUrl", "relatedUrl", "imageSourceUrl"]) {
      if (record[field] !== undefined) {
        try { const url = new URL(record[field]); if (url.protocol !== "https:" || url.username || url.password) throw new Error(); }
        catch { errors.push(`${name}: ${field} は認証情報なしのHTTPS URLが必要です`); }
      }
    }
    if (record.priceNumber !== undefined && (!Number.isFinite(record.priceNumber) || record.priceNumber < 0)) errors.push(`${name}: priceNumber は0以上の有限数が必要です`);
    if (Array.isArray(record.benefitCategories)) {
      for (const category of record.benefitCategories) if (!categoryIds.has(category)) errors.push(`${name}: 不明な特典カテゴリ ${category}`);
      if (new Set(record.benefitCategories).size !== record.benefitCategories.length) errors.push(`${name}: 特典カテゴリの重複`);
    }
    for (const field of ["lastChecked", "createdAt", "updatedAt"]) if (!isDateOnly(record[field]) || record[field] > japanDate()) errors.push(`${name}: ${field} の日付形式・未来日を確認してください`);
    if (["permitted", "free-stock"].includes(record.imagePermissionStatus) && (!record.imageUrl || !record.imageCredit || !record.imageSourceUrl || !record.imageAlt)) errors.push(`${name}: 使用許諾済み画像のURL・クレジット・出典・altが不足しています`);
    if (typeof record.id === "string" && typeof record.region === "string") {
      const image = model.getMunicipalityImage(record);
      if (typeof image.src !== "string") { errors.push(`${name}: 画像URLは文字列が必要です`); continue; }
      if (image.src.startsWith("/")) {
        if (!/^\/images\/[a-zA-Z0-9/_.-]+$/.test(image.src) || image.src.split("/").includes("..")) errors.push(`${name}: 不正な画像パス`);
        else { try { await access(fromRoot(`public${image.src}`)); } catch { errors.push(`${name}: 画像ファイルが存在しません (${image.src})`); } }
      } else {
        try { if (new URL(image.src).protocol !== "https:") throw new Error(); } catch { errors.push(`${name}: 不正な画像URL`); }
      }
      if (!image.alt || !image.credit || !image.sourceUrl) errors.push(`${name}: 表示画像のalt・出典・クレジットが不足しています`);
      const uses = images.get(image.src) || [];
      uses.push(record); images.set(image.src, uses);
    }
  }
  for (const [src, uses] of images) {
    if (uses.length < 2) continue;
    const description = `画像共用 ${src}: ${uses.map(m => m.municipality).join("・")}`;
    const featured = uses.filter(m => m.isFeatured && m.status !== "終了");
    if (featured.length > 1) errors.push(`注目の制度で${description}`);
    else if (uses.filter(m => m.imagePermissionStatus === "permitted").length > 1) errors.push(`自治体実写の${description}`);
    else warnings.push(description);
  }
  return { total: records.length, errors, warnings };
}

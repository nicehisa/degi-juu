import { parseArgs } from "node:util";
import { readMunicipalitySources } from "./lib/published-data.mjs";
import { readResearchModel, validateMunicipalityData } from "./lib/research-model.mjs";
import { fromRoot, readJson } from "./lib/research-io.mjs";

async function main() {
  const { values } = parseArgs({ options: { draft: { type: "string", multiple: true }, strict: { type: "boolean" }, help: { type: "boolean" } } });
  if (values.help) { console.log("npm run data:validate [-- --draft data/drafts/slug.json] [--strict]\n公開前の生データを、Municipality型・地域・特典ID・画像・日付で検査します。"); return; }
  const { base, automatic } = await readMunicipalitySources();
  const drafts = [];
  for (const path of values.draft || []) drafts.push(await readJson(fromRoot(path)));
  const result = await validateMunicipalityData([...base, ...automatic, ...drafts], await readResearchModel(), { draftSlugs: new Set(drafts.map(d => d.slug)) });
  console.log(`自治体データ ${result.total}件 / エラー ${result.errors.length}件 / 警告 ${result.warnings.length}件`);
  for (const error of result.errors) console.error(`ERROR: ${error}`);
  for (const warning of result.warnings) console.warn(`WARN: ${warning}`);
  if (result.errors.length || (values.strict && result.warnings.length)) process.exitCode = 1;
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });

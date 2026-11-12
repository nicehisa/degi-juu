import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { runMunicipalityChecks } from "./check-municipalities.mjs";
import { runCandidateDiscovery } from "./discover-candidates.mjs";
import { collectResearch, createResearchReport } from "./lib/research-report.mjs";
import { writeJson } from "./lib/research-io.mjs";

async function main() {
  const { values } = parseArgs({ options: { "output-dir": { type: "string" }, help: { type: "boolean" } } });
  if (values.help) { console.log("npm run data:report [-- --output-dir=/tmp]\n既存URL確認とRSS探索を実行し、research-report.md / research-summary.jsonと詳細JSONを出力。公開データやdata/は変更しません。"); return; }
  const outputDir = resolve(values["output-dir"] || tmpdir());
  await mkdir(outputDir, { recursive: true });
  // Each run gets fresh raw files; a failed phase must never reuse a stale successful report.
  const details = await mkdtemp(join(outputDir, "research-details-"));
  const result = await collectResearch(
    () => runMunicipalityChecks({ output: join(details, "checks.json"), stepSummary: false }),
    () => runCandidateDiscovery({ output: join(details, "candidates.json"), reportOutput: join(details, "discovery.json") }),
  );
  for (const failure of result.failures) console.warn(`${failure.phase}: ${failure.error}`);
  const { summary, markdown } = createResearchReport(result);
  summary.detailsDirectory = details;
  await writeFile(join(outputDir, "research-report.md"), markdown, "utf8");
  await writeJson(join(outputDir, "research-summary.json"), summary);
  console.log(`レポート: ${join(outputDir, "research-report.md")}\nサマリー: ${join(outputDir, "research-summary.json")}`);
  console.log(`正常${summary.normalCount}件 / 要確認${summary.reviewCount}件 / 未掲載候補${summary.newCandidateCount}件 / 調査エラー${summary.errorCount}件`);
  // External failures are reportable results. Only inability to produce the report fails this command.
}
main().catch(error => { console.error(error); process.exitCode = 1; });

import { parseArgs } from "node:util";
import { readPublishedMunicipalities } from "./lib/published-data.mjs";
import { checkMunicipality } from "./lib/municipality-health.mjs";
import { fromRoot, readJson, writeJson, pause, integerOption } from "./lib/research-io.mjs";

async function main() {
  const { values } = parseArgs({ options: { strict: { type: "boolean" }, "alert-on-change": { type: "boolean" }, "timeout-ms": { type: "string" }, "interval-ms": { type: "string" }, help: { type: "boolean" } } });
  if (values.help) { console.log("npm run data:check [-- --strict | --alert-on-change] [--timeout-ms=15000 --interval-ms=500]\n全掲載URLを順次確認。--strictは全警告、--alert-on-changeは取得異常・新規終了表現で終了コード2。掲載内容・情報確認日は変更しません。"); return; }
  const timeoutMs = integerOption(values["timeout-ms"], 15000, 1000, 60000);
  const intervalMs = integerOption(values["interval-ms"], 500, 0, 10000);
  const records = await readPublishedMunicipalities();
  const path = fromRoot("data/municipality-checks.json");
  const previous = await readJson(path, { checks: {} });
  if (!previous.checks || typeof previous.checks !== "object" || Array.isArray(previous.checks)) throw new Error("前回のチェック結果が不正です");
  const checks = {};
  for (const [index, record] of records.entries()) {
    console.log(`[${index + 1}/${records.length}] ${record.municipality}: ${record.officialUrl}`);
    checks[record.id] = await checkMunicipality(record, previous.checks[record.id], { timeoutMs });
    if (index < records.length - 1) await pause(intervalMs);
  }
  const warningCount = Object.values(checks).filter(c => c.warnings.length > 0).length;
  const alertCount = Object.values(checks).filter(c => c.alert).length;
  const report = { version: 1, completedAt: new Date().toISOString(), total: records.length, warningCount, alertCount, checks };
  await writeJson(path, report);
  console.table(Object.values(checks).map(c => ({ 自治体: c.municipality, HTTP: c.httpStatus ?? "取得失敗", 掲載状況: c.registeredStatus, 終了表現: c.signals.length, 新規: c.newSignals.length, 本文解析: c.analysis, 結果: c.warnings.length ? "要確認" : "取得OK" })));
  for (const check of Object.values(checks)) if (check.warnings.length) console.warn(`WARN ${check.municipality}: ${check.warnings.join(" / ")}\n  ${check.finalUrl || check.sourceUrl}${check.signals.length ? `\n  参考: ${check.signals[0]}` : ""}`);
  console.log(`全${records.length}件 / 警告あり${warningCount}件 / アラート${alertCount}件。初回は基準値を保存し、次回から終了表現の新規出現を比較します。`);
  console.log("終了表現は別年度・別プランの場合もあります。募集状況やlastCheckedを自動更新していません。");
  if (process.env.GITHUB_STEP_SUMMARY) {
    const { appendFile } = await import("node:fs/promises");
    await appendFile(process.env.GITHUB_STEP_SUMMARY, `## 自治体データ保守\n\n対象${records.length}件 / 警告${warningCount}件\n\n` + Object.values(checks).map(c => `- ${c.municipality}: HTTP ${c.httpStatus ?? "取得失敗"} / ${c.warnings.join("・") || "確認完了"}\n`).join(""));
  }
  if ((values.strict && warningCount) || (values["alert-on-change"] && alertCount)) process.exitCode = 2;
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });

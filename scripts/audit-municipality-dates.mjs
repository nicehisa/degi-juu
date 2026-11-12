import { writeFile } from "node:fs/promises";
import { readPublishedMunicipalities } from "./lib/published-data.mjs";
import { auditInformationDates } from "./lib/municipality-date-audit.mjs";

const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date());
const result = auditInformationDates(await readPublishedMunicipalities(), today);
const report = [
  "# 情報確認日の全件点検", "",
  `- 点検日（日本時間）: ${today}`,
  `- 対象: 公開データ全${result.total}件（固定データと自動追加データを統合・重複排除）`,
  "- 対象項目: lastChecked、および存在する場合は verifiedAt / checkedAt",
  "- 確認内容: 欠損、YYYY-MM-DD形式、暦上の実在、未来日、掲載作成日との前後関係",
  `- 不整合: ${result.errors.length}件`, "",
  `- 掲載作成日より前の確認日（参考確認）: ${result.warnings.length}件`, "",
  "| 情報確認日 | 件数 |", "| --- | ---: |",
  ...result.distribution.map(([date, count]) => `| ${date} | ${count} |`), "",
  "## 確認日の扱い", "",
  "情報確認日は制度内容を確認した記録です。今回の形式点検だけでは、制度の募集状況・費用・特典の再確認にはなりません。",
  "公式ページの自動到達確認日とは分けて管理し、点検した当日の日付には置き換えていません。",
  "古い確認日の制度は、実際に公式情報を再確認した際に情報確認日を更新してください。", "",
  ...(result.errors.length ? ["## 要修正", "", ...result.errors.map(error => `- ${error}`), ""] : []),
  ...(result.warnings.length ? ["## 参考確認", "", ...result.warnings.map(warning => `- ${warning}`), ""] : []),
].join("\n");
console.log(report);
if (process.argv.includes("--write")) await writeFile(new URL("../docs/information-date-audit.md", import.meta.url), report);
if (result.errors.length) process.exitCode = 1;

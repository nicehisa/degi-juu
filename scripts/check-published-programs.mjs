import { readFile, writeFile } from "node:fs/promises";
import ts from "typescript";
import { checkProgram } from "./lib/check-program.mjs";

const root = new URL("../", import.meta.url);
const source = ts.createSourceFile("municipalities.ts", await readFile(new URL("src/data/municipalities.ts", root), "utf8"), ts.ScriptTarget.Latest, true);
function literal(node) {
  if (ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return ts.isNumericLiteral(node) ? Number(node.text) : node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(p => [p.name.getText(source).replace(/^"|"$/g, ""), literal(p.initializer)]));
  throw new Error(`Unsupported data literal: ${node.kind}`);
}
const declaration = source.statements.filter(ts.isVariableStatement)
  .flatMap(s => [...s.declarationList.declarations]).find(d => d.name.getText(source) === "municipalities");
if (!declaration?.initializer) throw new Error("Municipality data not found");
const programs = literal(declaration.initializer);
const reportPath = new URL("public/data/program-checks.json", root);
const previous = JSON.parse(await readFile(reportPath, "utf8"));
const checks = {};
for (let i = 0; i < programs.length; i += 3) {
  await Promise.all(programs.slice(i, i + 3).map(async program => {
    checks[program.id] = await checkProgram(program, previous.checks[program.id]);
    console.log(`${program.municipality}: ${checks[program.id].result}${checks[program.id].changed ? " (changed)" : ""}`);
  }));
}
const report = { completedAt: new Date().toISOString(), checks };
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
const failed = Object.values(checks).filter(c => c.result === "failed").length;
const changed = Object.values(checks).filter(c => c.changed).length;
if (process.env.GITHUB_STEP_SUMMARY) await writeFile(process.env.GITHUB_STEP_SUMMARY,
  `## 自治体ページの日次確認\n\n成功: ${programs.length - failed} / 失敗: ${failed} / 内容変更（要確認）: ${changed}\n\n` +
  Object.entries(checks).map(([id, c]) => `- ${id}: ${c.error || (c.changed ? "内容変更あり" : "取得成功")}\n`).join(""), { flag: "a" });
if (failed) process.exitCode = 1;

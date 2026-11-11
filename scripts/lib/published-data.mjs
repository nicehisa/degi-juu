import { readFile } from "node:fs/promises";
import ts from "typescript";

const root = new URL("../../", import.meta.url);
export async function readLiteralArray(file, names) {
  const source = ts.createSourceFile(file, await readFile(new URL(file, root), "utf8"), ts.ScriptTarget.Latest, true);
  function literal(node) {
    if (ts.isStringLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
    if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(p => [p.name.getText(source).replace(/^"|"$/g, ""), literal(p.initializer)]));
    throw new Error(`Unsupported data literal: ${node.kind}`);
  }
  const declaration = source.statements.filter(ts.isVariableStatement).flatMap(s => [...s.declarationList.declarations])
    .find(d => names.includes(d.name.getText(source)));
  if (!declaration?.initializer) throw new Error(`Data not found: ${file}`);
  return literal(declaration.initializer);
}
export async function readPublishedMunicipalities() {
  const base = await readLiteralArray("src/data/municipalities.ts", ["baseMunicipalities", "municipalities"]);
  const automatic = JSON.parse(await readFile(new URL("src/data/autoMunicipalities.json", root), "utf8"));
  return [...base, ...automatic.filter(a => !base.some(b => b.prefecture === a.prefecture && b.municipality === a.municipality))];
}

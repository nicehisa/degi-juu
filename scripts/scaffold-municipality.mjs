import { parseArgs } from "node:util";
import { mkdir, readdir, writeFile, unlink } from "node:fs/promises";
import { readPublishedMunicipalities } from "./lib/published-data.mjs";
import { readResearchModel, checkMunicipalityTypes } from "./lib/research-model.mjs";
import { fetchResearchPage, parseResearchHtml } from "./lib/research-http.mjs";
import { buildMunicipalityScaffold } from "./lib/municipality-scaffold.mjs";
import { fromRoot, readJson } from "./lib/research-io.mjs";

async function main() {
  const { values } = parseArgs({ options: { name: { type: "string" }, url: { type: "string" }, prefecture: { type: "string" }, slug: { type: "string" }, "dry-run": { type: "boolean" }, help: { type: "boolean" } } });
  if (values.help) { console.log('npm run data:scaffold -- --name="自治体名" --url="https://..." [--prefecture="新潟県" --slug="municipality-prefecture" --dry-run]\n成功したHTML取得だけを今日の確認日として記録します。ひな形はdata/drafts/へ保存し、自動公開しません。'); return; }
  if (!values.name?.trim() || !values.url || values.name.length > 80) throw new Error("--name（80文字以内）と--urlが必要です");
  const response = await fetchResearchPage(values.url);
  if (response.status !== 200 || !/html/i.test(response.contentType)) throw new Error(`HTMLを取得できません: HTTP ${response.status} ${response.contentType}`);
  const page = parseResearchHtml(response.text);
  if (page.missing || !page.text) throw new Error("エラーページまたは空の本文です。ひな形は作成しません");
  const existing = await readPublishedMunicipalities();
  const draftsPath = fromRoot("data/drafts");
  const names = await readdir(draftsPath).catch(error => { if (error.code === "ENOENT") return []; throw error; });
  for (const name of names.filter(name => name.endsWith(".json"))) existing.push(await readJson(fromRoot(`data/drafts/${name}`)));
  const { record, review } = buildMunicipalityScaffold({ name: values.name.trim(), prefecture: values.prefecture, slug: values.slug, page, url: response.url, model: await readResearchModel(), existing });
  const errors = checkMunicipalityTypes([record]);
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(JSON.stringify(record, null, 2));
  if (values["dry-run"]) { console.log("dry-run: ファイルを保存していません"); return; }
  await mkdir(draftsPath, { recursive: true });
  await mkdir(fromRoot("data/research-notes"), { recursive: true });
  const path = fromRoot(`data/drafts/${record.slug}.json`);
  await writeFile(path, JSON.stringify(record, null, 2) + "\n", { flag: "wx" });
  try { await writeFile(fromRoot(`data/research-notes/${record.slug}.json`), JSON.stringify(review, null, 2) + "\n", { flag: "wx" }); }
  catch (error) { await unlink(path); throw error; }
  console.log(`非公開ひな形: data/drafts/${record.slug}.json\n確認メモ: data/research-notes/${record.slug}.json`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });

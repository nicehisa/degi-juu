import { parseArgs } from "node:util";
import { readPublishedMunicipalities, readLiteralArray } from "./lib/published-data.mjs";
import { fetchResearchPage } from "./lib/research-http.mjs";
import { discoveryQueries, parseNewsRss, mergeCandidates } from "./lib/candidate-discovery.mjs";
import { fromRoot, readJson, writeJson, pause, integerOption } from "./lib/research-io.mjs";

async function main() {
  const { values } = parseArgs({ options: { query: { type: "string", multiple: true }, days: { type: "string" }, help: { type: "boolean" } } });
  if (values.help) { console.log('npm run data:discover [-- --days=90 --query="デジタル住民票"]\nAPIキー不要。RSS候補をdata/candidates.jsonへ保存します。公開データは変更しません。'); return; }
  const days = integerOption(values.days, 90, 1, 3650);
  const published = await readPublishedMunicipalities();
  const prefectures = (await readLiteralArray("src/data/regions.ts", ["regions"])).flatMap(region => region.prefectures);
  const path = fromRoot("data/candidates.json");
  const previous = await readJson(path, []);
  if (!Array.isArray(previous)) throw new Error("candidates.jsonは配列である必要があります");
  const incoming = [], failures = [];
  const queries = values.query || discoveryQueries;
  for (const keyword of queries) {
    try {
      const url = new URL("https://news.google.com/rss/search");
      const query = values.query ? keyword : keyword.split(/\s+/).map(term => `"${term}"`).join(" ");
      url.search = new URLSearchParams({ q: `${query} when:${days}d`, hl: "ja", gl: "JP", ceid: "JP:ja" });
      const response = await fetchResearchPage(url.href);
      if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
      const items = parseNewsRss(response.text, keyword, prefectures);
      incoming.push(...items);
      console.log(`${keyword}: ${items.length}記事`);
    } catch (error) { failures.push({ keyword, error: error.message }); console.warn(`WARN ${keyword}: ${error.message}`); }
    await pause(500);
  }
  const candidates = mergeCandidates(previous, incoming, published);
  await writeJson(path, candidates);
  await writeJson(fromRoot("data/discovery-report.json"), { completedAt: new Date().toISOString(), queries, days, articles: incoming.length, candidates: candidates.length, failures });
  console.log(`未掲載候補記事: ${candidates.length}件（自治体・制度の同一性は要照合、既存掲載・受付終了分を除外）/ 取得失敗: ${failures.length}検索`);
  if (failures.length) process.exitCode = 1;
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });

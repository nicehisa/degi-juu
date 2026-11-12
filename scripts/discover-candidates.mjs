import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";
import { readPublishedMunicipalities, readLiteralArray } from "./lib/published-data.mjs";
import { fetchResearchPage } from "./lib/research-http.mjs";
import { discoveryQueries, parseNewsRss, mergeCandidates, normalizeUrl } from "./lib/candidate-discovery.mjs";
import { fromRoot, readJson, writeJson, pause, integerOption } from "./lib/research-io.mjs";

export async function runCandidateDiscovery({ query, days = 90, output = fromRoot("data/candidates.json"), reportOutput = fromRoot("data/discovery-report.json") } = {}) {
  const published = await readPublishedMunicipalities();
  const prefectures = (await readLiteralArray("src/data/regions.ts", ["regions"])).flatMap(region => region.prefectures);
  const path = fromRoot("data/candidates.json");
  const previous = await readJson(path, []);
  if (!Array.isArray(previous)) throw new Error("candidates.jsonは配列である必要があります");
  const incoming = [], failures = [];
  const queries = query || discoveryQueries;
  for (const keyword of queries) {
    try {
      const url = new URL("https://news.google.com/rss/search");
      const search = query ? keyword : keyword.split(/\s+/).map(term => `"${term}"`).join(" ");
      url.search = new URLSearchParams({ q: `${search} when:${days}d`, hl: "ja", gl: "JP", ceid: "JP:ja" });
      const response = await fetchResearchPage(url.href);
      if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
      const items = parseNewsRss(response.text, keyword, prefectures);
      incoming.push(...items);
      console.log(`${keyword}: ${items.length}記事`);
    } catch (error) { failures.push({ keyword, error: error.message }); console.warn(`WARN ${keyword}: ${error.message}`); }
    await pause(500);
  }
  const candidates = mergeCandidates(previous, incoming, published);
  const known = new Set(previous.map(candidate => normalizeUrl(candidate.articleUrl)));
  const report = { completedAt: new Date().toISOString(), queries, days, articles: incoming.length, candidates: candidates.length, firstSeenCandidates: candidates.filter(candidate => !known.has(normalizeUrl(candidate.articleUrl))).length, failures };
  await writeJson(output, candidates);
  await writeJson(reportOutput, report);
  console.log(`未掲載候補記事: ${candidates.length}件（自治体・制度の同一性は要照合、既存掲載・受付終了分を除外）/ 取得失敗: ${failures.length}検索`);
  return { candidates, report };
}
async function main() {
  const { values } = parseArgs({ options: { query: { type: "string", multiple: true }, days: { type: "string" }, output: { type: "string" }, "report-output": { type: "string" }, help: { type: "boolean" } } });
  if (values.help) { console.log('npm run data:discover [-- --days=90 --query="デジタル住民票" --output=/tmp/candidates.json --report-output=/tmp/discovery.json]\nAPIキー不要。RSS候補をdata/candidates.jsonへ保存します。公開データは変更しません。'); return; }
  const { report } = await runCandidateDiscovery({ query: values.query, days: integerOption(values.days, 90, 1, 3650), ...(values.output ? { output: fromRoot(values.output) } : {}), ...(values["report-output"] ? { reportOutput: fromRoot(values["report-output"]) } : {}) });
  if (report.failures.length) process.exitCode = 1;
}
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) main().catch(error => { console.error(error.message); process.exitCode = 1; });

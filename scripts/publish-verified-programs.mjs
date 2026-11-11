import { readFile, writeFile } from "node:fs/promises";
import { readPublishedMunicipalities, readLiteralArray } from "./lib/published-data.mjs";
import { fetchOfficialPage, buildAutoMunicipality, normalizeMunicipality } from "./lib/validate-candidate.mjs";
import { japanDate } from "./lib/check-program.mjs";

const root = new URL("../", import.meta.url);
const candidatePath = new URL("src/data/detectedMunicipalities.json", root);
const autoPath = new URL("src/data/autoMunicipalities.json", root);
const candidates = JSON.parse(await readFile(candidatePath, "utf8"));
const automatic = JSON.parse(await readFile(autoPath, "utf8"));
const published = await readPublishedMunicipalities();
const regions = await readLiteralArray("src/data/regions.ts", ["regions"]);
const knownHosts = published.map(p => new URL(p.officialUrl).hostname).filter(h => /\.(city|town|vill|pref)\./.test(h));
const quarantined = new Set();
let added = 0;
let invalid = 0;
for (const candidate of candidates) {
  const existing = published.find(p => p.prefecture === candidate.prefecture && p.municipality === normalizeMunicipality(candidate.municipality, candidate.prefecture));
  const original = candidate.officialUrl;
  let fetched = false;
  try {
    const page = await fetchOfficialPage(existing?.officialUrl || original, knownHosts);
    fetched = true;
    candidate.originalSourceUrl ||= original;
    candidate.officialUrl = page.url;
    candidate.sourceUrl = page.url;
    candidate.sourceTitle = page.title;
    candidate.sourceSnippet = page.text.slice(0, 150);
    candidate.linkCheckedAt = new Date().toISOString();
    candidate.linkValid = true;
    if (existing) {
      candidate.municipality = existing.municipality;
      candidate.prefecture = existing.prefecture;
      candidate.reviewStatus = existing.id.startsWith("auto-") ? "自動掲載済み" : "掲載済み（重複）";
      candidate.reviewNotes = "同じ自治体は掲載済みです。確認済みの公式URLへ統一しました。";
      candidate.publishedSlug = existing.slug;
      continue;
    }
    const record = buildAutoMunicipality(candidate, page, published, regions);
    if (record) {
      automatic.push(record);
      published.push(record);
      added++;
      candidate.reviewStatus = "自動掲載済み";
      candidate.publishedSlug = record.slug;
      candidate.lastChecked = japanDate();
      candidate.reviewNotes = "自治体公式の個別ページ、本文、自治体名、都道府県、重複の自動検証を通過しました。募集状況・費用・特典は未確定の場合、公式確認として表示します。";
    }
  } catch (error) {
    invalid++;
    candidate.linkValid = fetched;
    if (existing?.id.startsWith("auto-") && !fetched) quarantined.add(existing.id);
    candidate.linkCheckedAt = new Date().toISOString();
    candidate.reviewStatus = "保留（検証未完了）";
    candidate.reviewNotes = error instanceof Error ? error.message : "ページの検証に失敗しました";
    console.warn(`${candidate.programName}: ${candidate.reviewNotes}`);
  }
}
await writeFile(autoPath, JSON.stringify(automatic.filter(p => !quarantined.has(p.id)), null, 2) + "\n");
await writeFile(candidatePath, JSON.stringify(candidates, null, 2) + "\n");
const report = { completedAt: new Date().toISOString(), added, held: invalid, quarantined: quarantined.size, publishedTotal: published.length - quarantined.size };
await writeFile(new URL("public/data/publication-status.json", root), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
if (process.env.GITHUB_STEP_SUMMARY) await writeFile(process.env.GITHUB_STEP_SUMMARY, `\n## 自動掲載\n\n追加: ${added}件 / 保留: ${invalid}件 / 総掲載: ${published.length}件\n`, { flag: "a" });

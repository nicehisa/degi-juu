import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const approvedDataPath = path.join(rootDir, "src/data/municipalities.ts");
const detectedDataPath = path.join(rootDir, "src/data/detectedMunicipalities.json");

const searchQueries = [
  '"デジタル住民票" 自治体',
  '"デジタル住民票NFT" 自治体',
  '"デジタル住民NFT" 自治体',
  '"デジタル住民証" 自治体',
  '"デジタル町民" 自治体',
  '"デジタル村民" 自治体',
  '"関係人口" "デジタル住民"',
];

const requiredKeywords = [
  "デジタル住民票",
  "デジタル住民票NFT",
  "デジタル住民NFT",
  "デジタル住民証",
  "デジタル町民",
  "デジタル村民",
  "デジタル住民",
];

const riskyKeywords = [
  "ふるさと納税",
  "税控除",
  "住民登録",
  "転入",
  "投資",
  "値上がり",
];

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return url;
  }
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function slugifyJapanese(value) {
  return value
    .normalize("NFKC")
    .replace(/[都道府県市区町村]/g, "")
    .replace(/[^\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function isOfficialLikeUrl(url) {
  try {
    const host = new URL(url).hostname;
    return (
      host.endsWith(".lg.jp") ||
      host.includes(".city.") ||
      host.includes(".town.") ||
      host.includes(".vill.") ||
      host.includes(".village.") ||
      host.includes(".pref.")
    );
  } catch {
    return false;
  }
}

function detectType(text) {
  if (text.includes("デジタル住民票NFT")) return "デジタル住民票NFT";
  if (text.includes("デジタル住民NFT")) return "デジタル住民NFT";
  if (text.includes("デジタル住民証")) return "デジタル住民証";
  if (text.includes("デジタル住民票")) return "デジタル住民票";
  return "その他";
}

function detectPrefecture(text) {
  return prefectures.find((prefecture) => text.includes(prefecture)) ?? "要確認";
}

function detectMunicipality(text) {
  const matches = text.match(/[一-龠々ぁ-んァ-ヶー]{2,12}(?:市|区|町|村)/g) ?? [];
  const ignored = new Set(["自治体", "市区町村"]);
  return matches.find((match) => !ignored.has(match)) ?? "要確認";
}

function hasRequiredKeyword(text) {
  return requiredKeywords.some((keyword) => text.includes(keyword));
}

function collectRiskFlags(text) {
  return riskyKeywords.filter((keyword) => text.includes(keyword));
}

function toCandidate(result, approvedText, detectedItems) {
  const url = normalizeUrl(result.url);
  const title = normalizeText(result.title ?? "");
  const snippet = normalizeText(result.snippet ?? "");
  const combined = `${title} ${snippet}`;

  if (!url || !hasRequiredKeyword(combined)) return null;
  if (approvedText.includes(url)) return null;
  if (detectedItems.some((item) => item.officialUrl === url || item.sourceUrl === url)) return null;

  const municipality = detectMunicipality(combined);
  const prefecture = detectPrefecture(combined);
  const type = detectType(combined);
  const today = new Date().toISOString().slice(0, 10);
  const officialLike = isOfficialLikeUrl(url);
  const riskFlags = collectRiskFlags(combined);
  const idBase = `${municipality}-${prefecture}-${type}`;
  const slugBase = municipality === "要確認" ? `detected-${today}` : slugifyJapanese(idBase);

  return {
    id: `${slugBase}-${today}`.replace(/--+/g, "-"),
    slug: `${slugBase}-${today}`.replace(/--+/g, "-"),
    prefecture,
    municipality,
    programName: title || `${municipality} ${type}`,
    type,
    status: "要確認",
    officialUrl: url,
    sourceUrl: url,
    sourceTitle: title,
    sourceSnippet: snippet,
    detectedAt: today,
    lastChecked: today,
    confidence: officialLike && riskFlags.length === 0 ? "medium" : "low",
    riskFlags,
    reviewStatus: "未確認",
    reviewNotes:
      "自動検知された候補です。掲載前に自治体公式ページか、制度運営主体の公式情報を確認してください。",
  };
}

async function searchWithFixture() {
  const fixturePath = process.env.DEGIJUU_SEARCH_FIXTURE;
  if (!fixturePath) return null;

  const fixture = JSON.parse(await readFile(path.resolve(rootDir, fixturePath), "utf8"));
  return Array.isArray(fixture) ? fixture : fixture.items ?? [];
}

async function searchWithGoogle(query) {
  const key = process.env.GOOGLE_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_SEARCH_ENGINE_ID;
  if (!key || !cx) return [];

  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", key);
  url.searchParams.set("cx", cx);
  url.searchParams.set("q", query);
  url.searchParams.set("lr", "lang_ja");
  url.searchParams.set("num", "10");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Custom Search failed: ${response.status}`);
  }

  const data = await response.json();
  return (data.items ?? []).map((item) => ({
    title: item.title,
    url: item.link,
    snippet: item.snippet,
  }));
}

async function searchWithBing(query) {
  const key = process.env.BING_SEARCH_API_KEY;
  if (!key) return [];

  const url = new URL("https://api.bing.microsoft.com/v7.0/search");
  url.searchParams.set("q", query);
  url.searchParams.set("mkt", "ja-JP");
  url.searchParams.set("count", "10");

  const response = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": key },
  });
  if (!response.ok) {
    throw new Error(`Bing Search failed: ${response.status}`);
  }

  const data = await response.json();
  return (data.webPages?.value ?? []).map((item) => ({
    title: item.name,
    url: item.url,
    snippet: item.snippet,
  }));
}

async function searchWeb() {
  const fixtureResults = await searchWithFixture();
  if (fixtureResults) return fixtureResults;

  const provider = process.env.SEARCH_PROVIDER ?? "google";
  const results = [];

  for (const query of searchQueries) {
    const queryResults =
      provider === "bing" ? await searchWithBing(query) : await searchWithGoogle(query);
    results.push(...queryResults);
  }

  return results;
}

async function main() {
  const approvedText = await readFile(approvedDataPath, "utf8");
  const detectedItems = JSON.parse(await readFile(detectedDataPath, "utf8"));
  const rawResults = await searchWeb();
  const byUrl = new Map();

  for (const result of rawResults) {
    const candidate = toCandidate(result, approvedText, detectedItems);
    if (!candidate) continue;
    byUrl.set(candidate.officialUrl, candidate);
  }

  const newCandidates = [...byUrl.values()];
  if (newCandidates.length === 0) {
    console.log("No new digital resident program candidates found.");
    return;
  }

  const nextItems = [...detectedItems, ...newCandidates].sort((a, b) =>
    b.detectedAt.localeCompare(a.detectedAt)
  );
  await writeFile(detectedDataPath, `${JSON.stringify(nextItems, null, 2)}\n`);

  console.log(`Added ${newCandidates.length} candidate(s) to src/data/detectedMunicipalities.json`);
  for (const candidate of newCandidates) {
    console.log(`- ${candidate.programName}: ${candidate.officialUrl}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

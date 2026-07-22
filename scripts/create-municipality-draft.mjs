import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const detectedDataPath = path.join(rootDir, "src/data/detectedMunicipalities.json");

function getArgValue(name) {
  const exact = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);

  const index = process.argv.indexOf(name);
  if (index >= 0) return process.argv[index + 1];

  return undefined;
}

function escapeString(value) {
  return String(value ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function inferRegion(prefecture) {
  const regions = {
    北海道: ["北海道"],
    東北: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
    関東: ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"],
    中部: ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"],
    近畿: ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
    中国: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
    四国: ["徳島県", "香川県", "愛媛県", "高知県"],
    九州: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"],
  };

  for (const [region, prefectures] of Object.entries(regions)) {
    if (prefectures.includes(prefecture)) return region;
  }

  return "要確認";
}

function toMunicipalityDraft(candidate) {
  const today = new Date().toISOString().slice(0, 10);
  const municipality = candidate.municipality === "要確認" ? "要確認" : candidate.municipality;
  const prefecture = candidate.prefecture === "要確認" ? "要確認" : candidate.prefecture;

  return `{
  id: "${escapeString(candidate.slug)}",
  slug: "${escapeString(candidate.slug)}",
  region: "${escapeString(inferRegion(prefecture))}",
  prefecture: "${escapeString(prefecture)}",
  municipality: "${escapeString(municipality)}",
  programName: "${escapeString(candidate.programName)}",
  type: "${escapeString(candidate.type)}",
  summary:
    "${escapeString(
      `${municipality}のデジタル住民制度候補です。地域を応援する関係人口向けの制度として、公式情報の確認後に掲載内容を整理してください。`
    )}",
  price: "要確認",
  status: "要確認",
  target: "要確認",
  benefits: ["地域情報の提供"],
  benefitCategories: ["info"],
  benefitConditions:
    "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
  applicationMethod: "公式ページよりご確認ください。",
  officialUrl: "${escapeString(candidate.officialUrl)}",
  lastChecked: "${today}",
  notes:
    "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
  isOfficialInfo: false,
  isFeatured: false,
  createdAt: "${today}",
  updatedAt: "${today}",
},`;
}

async function main() {
  const id = getArgValue("--id");
  const url = getArgValue("--url");
  const candidates = JSON.parse(await readFile(detectedDataPath, "utf8"));

  if (!id && !url) {
    console.log("Usage: npm run draft:program -- --id <candidate-id>");
    console.log("   or: npm run draft:program -- --url <candidate-url>");
    console.log("");
    console.log("Available candidates:");
    for (const candidate of candidates) {
      console.log(`- ${candidate.id}: ${candidate.programName}`);
    }
    return;
  }

  const candidate = candidates.find((item) => item.id === id || item.officialUrl === url);
  if (!candidate) {
    console.error("Candidate was not found.");
    process.exitCode = 1;
    return;
  }

  console.log(toMunicipalityDraft(candidate));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

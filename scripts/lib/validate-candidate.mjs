import { load } from "cheerio";
import { createHash } from "node:crypto";
import { japanDate } from "./check-program.mjs";

const normalize = s => String(s || "").normalize("NFKC").replace(/\s+/g, " ").trim();
const programTerms = /デジタル住民(?:票|証|NFT)?|デジタル(?:町民|村民)|地域ファン.*会員証/i;
export function officialHost(url, knownHosts = []) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && !u.username && !u.password && (!u.port || u.port === "443") &&
      (u.hostname.endsWith(".lg.jp") || knownHosts.includes(u.hostname));
  } catch { return false; }
}

export async function fetchOfficialPage(url, knownHosts = [], fetcher = fetch) {
  let current = url;
  for (let redirects = 0; redirects < 5; redirects++) {
    if (!officialHost(current, knownHosts)) throw new Error("自治体公式ドメインを確認できません");
    const response = await fetcher(current, { redirect: "manual", signal: AbortSignal.timeout(20000) });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      await response.body?.cancel();
      if (!location) throw new Error("リダイレクト先がありません");
      current = new URL(location, current).href;
      continue;
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (!response.headers.get("content-type")?.includes("html")) throw new Error("本文を確認できるHTMLページが必要です");
    const chunks = [];
    let size = 0;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > 2 * 1024 * 1024) throw new Error("ページ容量が上限を超えています");
      chunks.push(chunk);
    }
    const bytes = Buffer.concat(chunks);
    const charset = /charset\s*=\s*["']?(shift[_-]?jis|sjis)/i.test(response.headers.get("content-type") || "") ||
      /charset\s*=\s*["']?(shift[_-]?jis|sjis)/i.test(bytes.subarray(0, 4096).toString("ascii")) ? "shift_jis" : "utf-8";
    const $ = load(new TextDecoder(charset).decode(bytes));
    const titles = [$("h1").first().text(), $("title").text(), $("h2").first().text()].map(normalize);
    const title = titles.find(t => programTerms.test(t)) || titles.find(Boolean) || "";
    $("script,style,noscript").remove();
    const identityText = normalize($("body").text());
    $("nav,header,footer").remove();
    const content = $("main,article,#main,#contents,.contents").first();
    const text = normalize(content.length ? content.text() : $("body").text());
    if (/^404\b/i.test(title) || /not found|ページ.{0,12}(見つかりません|存在しません|見つかりませんでした)|お探しのページ|アクセスできません|Just a moment|Access Denied|captcha/i.test(`${title} ${text}`)) throw new Error("エラーページまたはアクセス制限を検出しました");
    if (!programTerms.test(title) || !programTerms.test(text)) throw new Error("制度の個別ページではありません");
    return { url: current, title, text, identityText };
  }
  throw new Error("リダイレクトが多すぎます");
}

export function normalizeMunicipality(value, prefecture) {
  return normalize(value).replace(prefecture, "").trim();
}

export function buildAutoMunicipality(candidate, page, published, regions) {
  if (/ふるさと納税|税控除|所得控除|値上がり|投資/.test(`${page.title} ${page.text}`)) throw new Error("税制・投資に関する記載があるため個別確認が必要です");
  if (!/関係.?人口|NFT|ファンクラブ|地域ファン|デジタル(?:町民|村民)|コミュニティ|会員証/i.test(page.text)) throw new Error("地域参加型の制度であることを確認できません");
  const prefecture = candidate.prefecture;
  const municipality = normalizeMunicipality(candidate.municipality, prefecture);
  const region = regions.find(r => r.prefectures.includes(prefecture));
  if (!region || !/^[一-龠々ぁ-んァ-ヶー]{1,14}[市区町村]$/.test(municipality)) throw new Error("都道府県・自治体名を確定できません");
  if (!page.text.includes(municipality) || !`${page.title} ${page.identityText || page.text}`.includes(prefecture)) throw new Error("本文で自治体名・都道府県を照合できません");
  if (published.some(p => p.prefecture === prefecture && normalizeMunicipality(p.municipality, prefecture) === municipality)) return null;
  if (!programTerms.test(page.title)) throw new Error("制度名を確認できません");
  const title = page.title.split(/[|｜]/)[0].trim().slice(0, 180);
  const typeText = `${title} ${page.text}`;
  const type = /デジタル住民票/.test(title) ? (/NFT/i.test(typeText) ? "デジタル住民票NFT" : "デジタル住民票") :
    /デジタル住民証/.test(title) ? "デジタル住民証" : /NFT/i.test(typeText) ? "デジタル住民NFT" : "その他";
  const id = `auto-${createHash("sha256").update(`${prefecture}/${municipality}`).digest("hex").slice(0, 16)}`;
  const today = japanDate();
  return {
    id, slug: id, prefecture, municipality, region: region.name, programName: title, type,
    summary: `${prefecture}${municipality}が公表する「${title}」の制度案内です。参加条件や最新の受付状況は公式ページをご確認ください。`,
    price: "公式ページで確認", status: "要確認", target: "公式ページで確認", benefits: [], benefitCategories: [],
    benefitConditions: "特典の有無・内容・利用条件は公式ページをご確認ください。",
    applicationMethod: "公式ページの案内をご確認ください。", officialUrl: page.url,
    imagePermissionStatus: "pending", lastChecked: today,
    notes: "制度名・自治体名を公式ページで確認しています。募集状況、費用、特典は未確定のため、公式の最新情報をご確認ください。",
    isOfficialInfo: false, isFeatured: false, createdAt: today, updatedAt: today,
  };
}

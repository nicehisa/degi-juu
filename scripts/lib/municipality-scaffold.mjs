import { createHash } from "node:crypto";
import { japanDate } from "./check-program.mjs";

export function buildMunicipalityScaffold({ name, prefecture, slug, page, url, model, existing, date = japanDate() }) {
  const mentioned = model.regions.flatMap(r => r.prefectures).filter(p => page.identityText.includes(p));
  const confirmedPrefecture = prefecture || (mentioned.length === 1 ? mentioned[0] : "要確認");
  const region = model.regions.find(r => r.prefectures.includes(confirmedPrefecture));
  if (prefecture && !region) throw new Error("都道府県はregions.tsに定義された名称で指定してください");
  const id = slug || `draft-${createHash("sha256").update(`${confirmedPrefecture}/${name}`).digest("hex").slice(0, 12)}`;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error("slugは半角小文字・数字・ハイフンで指定してください");
  if (existing.some(m => m.slug === id || m.id === id)) throw new Error("idまたはslugが既存データと重複しています");
  const title = (page.heading || page.title).slice(0, 180);
  if (!title) throw new Error("HTMLから制度名のひな形を取得できません");
  const type = /会員|ファンクラブ/.test(title) ? "デジタル会員証" : /デジタル住民票/.test(title) ? (/NFT/i.test(title) ? "デジタル住民票NFT" : "デジタル住民票") : /デジタル住民証/.test(title) ? "デジタル住民証" : /NFT/i.test(title) ? "デジタル住民NFT" : /アプリ/.test(title) ? "アプリ型" : "その他";
  const counts = new Map();
  for (const record of existing) { const src = model.getMunicipalityImage(record).src; counts.set(src, (counts.get(src) || 0) + 1); }
  const tie = parseInt(createHash("sha256").update(id).digest("hex").slice(0, 8), 16);
  const stocks = model.stocks.map((stock, index) => ({ stock, index }));
  stocks.sort((a, b) => (counts.get(a.stock.src) || 0) - (counts.get(b.stock.src) || 0) || ((a.index + tie) % stocks.length) - ((b.index + tie) % stocks.length));
  const stock = stocks[0]?.stock;
  if (!stock) throw new Error("既存ストック素材がありません");
  const record = {
    id, slug: id, prefecture: confirmedPrefecture, municipality: name, region: region?.name || "要確認",
    programName: title, type, summary: page.summary || `${name}の「${title}」に関する案内です。制度内容は公式ページで確認してください。`,
    price: "要確認", status: "要確認", target: "要確認", benefits: [], benefitCategories: /NFT/i.test(title) ? ["nft"] : [],
    benefitConditions: "特典の有無・内容・対象・利用条件は公式ページで確認してください。",
    applicationMethod: "公式ページの案内を確認してください。", officialUrl: url,
    imageUrl: stock.src, imagePermissionStatus: "free-stock", imageCredit: stock.credit, imageSourceUrl: stock.sourceUrl, imageAlt: stock.alt,
    lastChecked: date, notes: "調査用ひな形です。情報確認日はHTMLを取得した日です。自治体名・制度内容・費用・受付状況・特典を目視確認してから公開してください。",
    isOfficialInfo: false, isFeatured: false, createdAt: date, updatedAt: date,
  };
  const review = { slug: id, fetchedAt: new Date().toISOString(), sourceUrl: url, sourceTitle: page.title,
    reviewRequired: ["自治体の正式名称（地区名と自治体名の区別）", "都道府県・地方区分", "公式・発行元ページであること", "制度名・制度タイプ", "参加費用・追加費用", "募集状況・対象者", "特典と利用条件", "概要の編集・転載条件", "情報確認日"],
    stockImage: { ...stock }, status: "未確認・非公開" };
  return { record, review };
}

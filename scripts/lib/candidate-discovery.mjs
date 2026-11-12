import { createHash } from "node:crypto";
import { load } from "cheerio";
import { normalizeText } from "./research-http.mjs";

export const discoveryQueries = ["デジタル住民票", "デジタル村民", "デジタル市民", "自治体 NFT 住民", "ふるさと住民登録 デジタル", "デジタル住民証", "地域ファン デジタル会員証"];
export function isRelevantCandidate(candidate) {
  const text = normalizeText(`${candidate.title} ${candidate.snippet || ""}`);
  const directProgram = /デジタル(?:住民|村民|町民)|(?:住民|村民|市民|ファンクラブ|会員).{0,24}NFT|NFT.{0,24}(?:住民|村民|市民|会員)|デジタル市民(?:証|パス|登録)|地域ファン.{0,24}会員証/i.test(text);
  const localName = /(?:^|[\s【「『（・])[一-龯々ヶケ]{1,10}[市区町村](?=$|[\s、・」』】:：がはのとをにへで])/u.test(text);
  return directProgram || (/ふるさと住民(?:登録|制度)/.test(text) && localName);
}
export function normalizeUrl(value) {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol) || url.username || url.password) return null;
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) if (/^(utm_|fbclid$|gclid$)/i.test(key)) url.searchParams.delete(key);
    url.searchParams.sort();
    return url.href.replace(/\/$/, "");
  } catch { return null; }
}
export function isAlreadyPublished(candidate, published) {
  const candidateUrls = [candidate.articleUrl, candidate.officialUrl, candidate.sourceUrl].map(normalizeUrl).filter(Boolean);
  const text = normalizeText(`${candidate.title} ${candidate.snippet || ""}`);
  return published.some(record => [record.officialUrl, record.relatedUrl].map(normalizeUrl).filter(Boolean).some(url => candidateUrls.includes(url)) ||
    ((candidate.municipality === record.municipality || text.includes(record.municipality)) && (!candidate.prefecture || candidate.prefecture === record.prefecture)));
}
export function parseNewsRss(xml, keyword, prefectures, now = new Date()) {
  const $ = load(xml, { xmlMode: true });
  if (!$("rss > channel").length) throw new Error("Google News RSSとして解析できません");
  return $("channel > item").toArray().flatMap(item => {
    const node = $(item);
    const articleUrl = normalizeUrl(node.find("link").first().text());
    const title = normalizeText(node.find("title").text()).slice(0, 500);
    if (!articleUrl || !title) return [];
    const snippet = normalizeText(load(node.find("description").text()).text()).slice(0, 500);
    const mentioned = prefectures.filter(p => `${title} ${snippet}`.includes(p));
    const publication = new Date(node.find("pubDate").text());
    return [{ id: `rss-${createHash("sha256").update(articleUrl).digest("hex").slice(0, 20)}`, title, articleUrl,
      sourceName: normalizeText(node.find("source").text()), sourceUrl: normalizeUrl(node.find("source").attr("url")),
      publishedAt: Number.isFinite(publication.getTime()) ? publication.toISOString() : null,
      snippet, prefecture: mentioned.length === 1 ? mentioned[0] : null,
      municipality: null, officialUrl: null, reviewStatus: "未確認", keywords: [keyword],
      discoveredAt: now.toISOString(), lastSeenAt: now.toISOString() }];
  });
}
export function mergeCandidates(previous, incoming, published) {
  const byUrl = new Map();
  for (const candidate of previous) if (!isAlreadyPublished(candidate, published) && (isRelevantCandidate(candidate) || candidate.reviewStatus !== "未確認")) byUrl.set(normalizeUrl(candidate.articleUrl), candidate);
  for (const candidate of incoming) {
    if (isAlreadyPublished(candidate, published) || !isRelevantCandidate(candidate)) continue;
    const key = normalizeUrl(candidate.articleUrl);
    const old = byUrl.get(key);
    byUrl.set(key, old ? { ...candidate, ...old, lastSeenAt: candidate.lastSeenAt, keywords: [...new Set([...(old.keywords || []), ...candidate.keywords])] } : candidate);
  }
  return [...byUrl.values()].sort((a, b) => (b.publishedAt || b.discoveredAt).localeCompare(a.publishedAt || a.discoveredAt));
}

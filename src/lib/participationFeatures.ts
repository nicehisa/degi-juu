import type { Municipality } from "@/data/municipalities";

export function getParticipationFeatures(m: Municipality) {
  const isNft = /NFT/i.test(`${m.type} ${m.programName} ${m.relatedUrl ?? ""}`);
  const format = m.type === "デジタル会員証" ? "会員証型" : m.type === "アプリ型" ? "アプリ型" :
    m.type === "デジタル住民証" ? "デジタル住民証型" : m.type === "デジタル住民票" ? "デジタル住民票型" : undefined;
  const price = m.priceNumber;
  const archived = m.status === "終了";
  const lowCost = Number.isFinite(price) && price != null && price >= 0 && price <= 1000;
  return {
    isNft,
    format,
    priceTag: lowCost ? (price === 0 ? (archived ? "募集時無料" : "参加費無料") : (archived ? "募集時1,000円以下" : "1,000円以下")) : undefined,
    priceNote: lowCost && !archived ? "基本・最低費用の目安。追加費用・条件は公式で確認" : undefined,
  };
}

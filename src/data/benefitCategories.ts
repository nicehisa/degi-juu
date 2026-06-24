export type BenefitCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export const benefitCategories: BenefitCategory[] = [
  {
    id: "tourism",
    slug: "tourism",
    name: "観光・施設優待",
    description: "観光スポットや地域施設の入場優待・割引など。",
    icon: "🏯",
  },
  {
    id: "stay",
    slug: "stay",
    name: "宿泊・旅行",
    description: "地域内の宿泊施設や旅行プランに関連した特典。",
    icon: "🏨",
  },
  {
    id: "food",
    slug: "food",
    name: "飲食・特産品",
    description: "地域の飲食店や特産品に関連したサービス・情報。",
    icon: "🍱",
  },
  {
    id: "event",
    slug: "event",
    name: "イベント参加",
    description: "地域イベントや祭りへの参加・優先案内など。",
    icon: "🎉",
  },
  {
    id: "community",
    slug: "community",
    name: "限定コミュニティ",
    description: "デジタル住民限定のオンラインコミュニティやグループへの参加。",
    icon: "👥",
  },
  {
    id: "info",
    slug: "info",
    name: "地域情報・ニュース",
    description: "地域の最新情報やニュースレター、移住・観光情報の提供。",
    icon: "📰",
  },
  {
    id: "nft",
    slug: "nft",
    name: "NFT・デジタル証明",
    description: "デジタル住民であることを示すNFTや証明書の発行。",
    icon: "🪙",
  },
  {
    id: "experience",
    slug: "experience",
    name: "体験プログラム",
    description: "農業体験、工芸体験など地域ならではの体験型プログラム。",
    icon: "🌾",
  },
  {
    id: "coupon",
    slug: "coupon",
    name: "クーポン・割引",
    description: "地域の店舗や施設で使えるクーポンや割引サービス。",
    icon: "🏷️",
  },
  {
    id: "other",
    slug: "other",
    name: "その他",
    description: "上記カテゴリに当てはまらないその他の特典・サービス。",
    icon: "✨",
  },
];

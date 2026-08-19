export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  body: string[];
  relatedLinks: { href: string; label: string }[];
};

export const articles: Article[] = [
  {
    slug: "digital-resident-certificate-basics",
    title: "デジタル住民票とは？法律上の住民票との違いを整理",
    description:
      "デジタル住民票、デジタル住民NFT、デジタル住民証の基本と、住民基本台帳上の住民票との違いを解説します。",
    category: "基礎知識",
    publishedAt: "2026-08-19",
    updatedAt: "2026-08-19",
    readingMinutes: 4,
    body: [
      "デジタル住民票は、地域外に住む人が自治体や地域とゆるやかにつながるための関係人口向け制度として使われる名称です。",
      "ただし、法律上の住民票、住民登録、転入手続きとは異なります。行政上の居住証明や住民票の写しが取得できる制度ではありません。",
      "制度名、参加方法、特典、費用は自治体や発行元によって異なります。参加前には必ず公式ページで最新情報を確認してください。",
    ],
    relatedLinks: [
      { href: "/about", label: "デジタル住民制度とは" },
      { href: "/difference", label: "ふるさと納税との違い" },
      { href: "/municipalities", label: "自治体一覧を見る" },
    ],
  },
  {
    slug: "how-to-choose-program",
    title: "デジタル住民制度の選び方。地域・特典・制度タイプで見るポイント",
    description:
      "地域を応援したい人向けに、デジタル住民制度を選ぶときの確認ポイントをまとめました。",
    category: "選び方",
    publishedAt: "2026-08-19",
    updatedAt: "2026-08-19",
    readingMinutes: 5,
    body: [
      "まずは応援したい地域があるかを確認します。特定の地域に思い入れがある場合は、地域別ページや都道府県別ページから探すのが分かりやすいです。",
      "次に、期待する関わり方を整理します。観光や宿泊のきっかけがほしいのか、イベントやコミュニティに参加したいのかで見るべき制度は変わります。",
      "NFT型の場合は、ウォレット設定や管理が必要になる場合があります。NFTに慣れていない場合は、アプリ型や会員証型も候補に入れると比較しやすくなります。",
    ],
    relatedLinks: [
      { href: "/diagnosis", label: "おすすめ診断を試す" },
      { href: "/regions", label: "地域から探す" },
      { href: "/benefits", label: "特典から探す" },
    ],
  },
  {
    slug: "nft-risk-checklist",
    title: "NFT型デジタル住民制度に参加する前の確認リスト",
    description:
      "NFT型の制度に参加する前に確認したい、費用・管理・投資性の誤認防止ポイントを整理します。",
    category: "注意点",
    publishedAt: "2026-08-19",
    updatedAt: "2026-08-19",
    readingMinutes: 4,
    body: [
      "NFT型の制度は、デジタル上の証明や参加証として設計されている場合があります。一方で、暗号資産やウォレットに関する知識が必要になることがあります。",
      "デジじゅうでは、NFTの値上がりや投資性を期待させる紹介は行いません。制度の目的は、地域応援や関係人口づくりとして確認してください。",
      "購入・参加前には、公式ページで販売状況、価格、特典条件、ウォレット要否、問い合わせ先を確認することをおすすめします。",
    ],
    relatedLinks: [
      { href: "/legal", label: "注意事項・免責事項" },
      { href: "/types", label: "制度タイプから探す" },
      { href: "/editorial-policy", label: "掲載基準・編集方針" },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

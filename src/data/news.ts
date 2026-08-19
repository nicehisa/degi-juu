export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  category: "お知らせ" | "更新" | "掲載情報";
  publishedAt: string;
  body: string[];
};

export const newsItems: NewsItem[] = [
  {
    slug: "site-renewal-2026-08",
    title: "デジじゅうの検索導線と情報ページを拡充しました",
    summary:
      "地域・特典・制度タイプから探しやすくするため、SEOページ、運営会社ページ、ポリシーページを追加しました。",
    category: "更新",
    publishedAt: "2026-08-19",
    body: [
      "デジじゅうでは、全国のデジタル住民制度を探しやすくするため、地域別・都道府県別・特典別ページを拡充しました。",
      "あわせて、運営会社ページ、掲載基準・編集方針、広告・PR表記ポリシーも追加し、情報サイトとしての透明性を高めています。",
    ],
  },
  {
    slug: "listing-request-open",
    title: "自治体・制度運営者向けの掲載依頼フォームを公開しました",
    summary:
      "新規掲載、掲載情報の修正、公式ページURLの共有をフォームから受け付けます。",
    category: "お知らせ",
    publishedAt: "2026-08-19",
    body: [
      "自治体・制度運営者の方から、掲載依頼や修正依頼を受け付けるフォームを公開しました。",
      "掲載可否は、公式情報の確認、誤認リスク、読者にとっての分かりやすさを基準に確認します。",
    ],
  },
  {
    slug: "daily-detection-start",
    title: "新しいデジタル住民制度の候補検知フローを追加しました",
    summary:
      "GitHub Actionsで新規制度候補を検知し、管理者確認ページで確認できる仕組みを追加しました。",
    category: "掲載情報",
    publishedAt: "2026-08-19",
    body: [
      "新しいデジタル住民制度の候補を定期的に検知する仕組みを追加しました。",
      "検知結果は自動公開せず、公式情報や法務リスクを人が確認してから掲載データに反映する運用です。",
    ],
  },
];

export function getNewsItem(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}

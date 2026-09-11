export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  category: "お知らせ" | "更新" | "掲載情報";
  publishedAt: string;
  body: string[];
};

export const newsItems: NewsItem[] = [];

export function getNewsItem(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}

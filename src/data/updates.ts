export type UpdateLog = {
  id: string;
  date: string;
  category: "掲載追加" | "情報更新" | "機能追加" | "注意喚起";
  title: string;
  description: string;
  href?: string;
};

export const updateLogs: UpdateLog[] = [
  {
    id: "release-beta",
    date: "2026-06-01",
    category: "機能追加",
    title: "デジじゅうβ版を公開",
    description: "全国のデジタル住民制度を、地域・特典・制度タイプから探せるMVPを公開しました。",
    href: "/",
  },
  {
    id: "daily-detection",
    date: "2026-07-23",
    category: "機能追加",
    title: "新規制度の自動検知ワークフローを追加",
    description: "Google検索グラウンディングを使い、未確認候補を管理画面で確認できる仕組みを追加しました。",
    href: "/admin/detected",
  },
  {
    id: "forms-pr-admin",
    date: "2026-07-28",
    category: "機能追加",
    title: "掲載依頼・問い合わせ・広告PR相談フォームを追加",
    description: "自治体・事業者からの掲載依頼、広告PR相談、お問い合わせを受け付ける導線を追加しました。",
    href: "/listing-request",
  },
  {
    id: "policy-seo-pages",
    date: "2026-07-28",
    category: "情報更新",
    title: "掲載基準・広告ポリシー・SEOページを追加",
    description: "情報の確認方針、PR表記方針、地域別・特典別の検索導線を強化しました。",
    href: "/editorial-policy",
  },
];

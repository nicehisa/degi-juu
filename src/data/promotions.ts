export type PromotionPlacement = "home" | "municipalities" | "municipality-detail";

export type Promotion = {
  id: string;
  placement: PromotionPlacement;
  label: string;
  title: string;
  description: string;
  href: string;
  active: boolean;
};

export const promotions: Promotion[] = [
  {
    id: "advertise-with-degijuu",
    placement: "municipalities",
    label: "PR掲載枠",
    title: "自治体DX・地域ファン向けサービスのPR掲載を受け付けています",
    description:
      "デジタル住民制度や関係人口づくりに関心のあるユーザーへ、広告・タイアップ記事・協賛枠で情報を届けられます。",
    href: "/advertise",
    active: true,
  },
  {
    id: "detail-page-pr",
    placement: "municipality-detail",
    label: "PR掲載枠",
    title: "地域ファン施策・自治体DXサービスのPR相談を受け付けています",
    description:
      "制度詳細を確認している関心度の高いユーザーへ、関連サービスや事例型PRを明確な広告表記付きで掲載できます。",
    href: "/advertise",
    active: true,
  },
];

export function getActivePromotions(placement: PromotionPlacement) {
  return promotions.filter((promotion) => promotion.active && promotion.placement === placement);
}

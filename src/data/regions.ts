export type Region = {
  id: string;
  slug: string;
  name: string;
  prefectures: string[];
  description: string;
};

export const regions: Region[] = [
  {
    id: "hokkaido",
    slug: "hokkaido",
    name: "北海道",
    prefectures: ["北海道"],
    description: "雄大な自然と食の宝庫。道内各地の地域ファン向け制度を探せます。",
  },
  {
    id: "tohoku",
    slug: "tohoku",
    name: "東北",
    prefectures: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
    description: "豊かな自然と歴史・文化が息づく東北の地域制度を探せます。",
  },
  {
    id: "kanto",
    slug: "kanto",
    name: "関東",
    prefectures: ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"],
    description: "首都圏を含む関東エリアの自治体による地域ファン制度を探せます。",
  },
  {
    id: "chubu",
    slug: "chubu",
    name: "中部",
    prefectures: ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"],
    description: "山岳・海岸・盆地など多様な地形を持つ中部の制度を探せます。",
  },
  {
    id: "kinki",
    slug: "kinki",
    name: "近畿",
    prefectures: ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
    description: "歴史・文化・観光が豊かな近畿エリアの地域制度を探せます。",
  },
  {
    id: "chugoku",
    slug: "chugoku",
    name: "中国",
    prefectures: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
    description: "自然豊かな中国地方の自治体によるデジタル住民制度を探せます。",
  },
  {
    id: "shikoku",
    slug: "shikoku",
    name: "四国",
    prefectures: ["徳島県", "香川県", "愛媛県", "高知県"],
    description: "四国八十八か所など独自文化を持つ四国の地域制度を探せます。",
  },
  {
    id: "kyushu",
    slug: "kyushu",
    name: "九州・沖縄",
    prefectures: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"],
    description: "豊かな自然と食文化が魅力の九州・沖縄の地域制度を探せます。",
  },
];

export function getRegionByPrefecture(prefecture: string): Region | undefined {
  return regions.find((r) => r.prefectures.includes(prefecture));
}

export function getRegionName(prefecture: string): string {
  return getRegionByPrefecture(prefecture)?.name ?? "その他";
}

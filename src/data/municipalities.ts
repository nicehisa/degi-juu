export type MunicipalityType =
  | "デジタル住民票NFT"
  | "デジタル住民NFT"
  | "デジタル住民証"
  | "デジタル会員証"
  | "アプリ型"
  | "その他";

export type MunicipalityStatus = "販売中" | "受付中" | "終了" | "要確認";

export type Municipality = {
  id: string;
  slug: string;
  region: string;
  prefecture: string;
  municipality: string;
  programName: string;
  type: MunicipalityType;
  summary: string;
  price: string;
  priceNumber?: number;
  status: MunicipalityStatus;
  target: string;
  benefits: string[];
  benefitCategories: string[];
  benefitConditions: string;
  applicationMethod: string;
  officialUrl: string;
  relatedUrl?: string;
  lastChecked: string;
  notes: string;
  isOfficialInfo: boolean;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
};

export const municipalities: Municipality[] = [
  {
    id: "nishikawa-yamagata",
    slug: "nishikawa-yamagata",
    region: "東北",
    prefecture: "山形県",
    municipality: "西川町",
    programName: "西川町デジタル住民票NFT",
    type: "デジタル住民票NFT",
    summary:
      "自治体が発行するデジタル住民票NFT。地域を応援する関係人口向けの制度です。デジタル上で西川町とつながり、地域を応援できます。",
    price: "要確認",
    status: "要確認",
    target: "西川町外在住者・地域ファン",
    benefits: ["限定コミュニティへの参加", "地域特典", "イベント案内・優先参加"],
    benefitCategories: ["community", "event", "info"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.town.nishikawa.yamagata.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: true,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "mine-yamaguchi",
    slug: "mine-yamaguchi",
    region: "中国",
    prefecture: "山口県",
    municipality: "美祢市",
    programName: "美祢市デジタル住民票NFT",
    type: "デジタル住民票NFT",
    summary:
      "美祢市のデジタル住民であることを示すNFT。市外の方が美祢市を応援するためのデジタル上の制度です。",
    price: "要確認",
    status: "要確認",
    target: "美祢市外在住者・地域ファン",
    benefits: ["観光施設関連の特典", "地域関連の特典"],
    benefitCategories: ["tourism", "info"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www2.city.mine.lg.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "sosa-chiba",
    slug: "sosa-chiba",
    region: "関東",
    prefecture: "千葉県",
    municipality: "匝瑳市",
    programName: "匝瑳市デジタル住民票NFT",
    type: "デジタル住民票NFT",
    summary:
      "市外在住者もデジタル上で地域と関われる制度。匝瑳市の関係人口創出を目的としたデジタル住民票NFTです。",
    price: "要確認",
    status: "要確認",
    target: "匝瑳市外在住者・地域ファン",
    benefits: ["地域ファン向け特典", "地域情報の提供"],
    benefitCategories: ["info", "community"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.city.sosa.lg.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "akitakata-hiroshima",
    slug: "akitakata-hiroshima",
    region: "中国",
    prefecture: "広島県",
    municipality: "安芸高田市",
    programName: "安芸高田市デジタル住民票NFT",
    type: "デジタル住民票NFT",
    summary:
      "デジタル住民として地域を応援するNFT型制度。安芸高田市の関係人口拡大・地域ファンづくりを目的としています。",
    price: "要確認",
    status: "要確認",
    target: "安芸高田市外在住者・地域ファン",
    benefits: ["地域特典", "イベント関連特典"],
    benefitCategories: ["event", "info"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.akitakata.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: true,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "habikino-osaka",
    slug: "habikino-osaka",
    region: "近畿",
    prefecture: "大阪府",
    municipality: "羽曳野市",
    programName: "羽曳野市デジタル住民票NFT",
    type: "デジタル住民票NFT",
    summary:
      "地域との関係性を示すデジタル住民票NFT。羽曳野市のファン・応援者向けのデジタル制度です。",
    price: "要確認",
    status: "要確認",
    target: "羽曳野市外在住者・地域ファン",
    benefits: ["地域特典"],
    benefitCategories: ["info"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.city.habikino.lg.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "yachiyo-ibaraki",
    slug: "yachiyo-ibaraki",
    region: "関東",
    prefecture: "茨城県",
    municipality: "八千代町",
    programName: "八千代町デジタル住民票NFT",
    type: "デジタル住民票NFT",
    summary:
      "デジタル上で八千代町とつながる関係人口向け制度。町の魅力を発信しながら、地域を応援できます。",
    price: "要確認",
    status: "要確認",
    target: "八千代町外在住者・地域ファン",
    benefits: ["地域関連の特典"],
    benefitCategories: ["info", "food"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.town.ibaraki-yachiyo.lg.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "kumakogen-ehime",
    slug: "kumakogen-ehime",
    region: "四国",
    prefecture: "愛媛県",
    municipality: "久万高原町",
    programName: "久万高原町デジタル住民票NFT",
    type: "デジタル住民票NFT",
    summary:
      "自治体が発行するデジタル住民票NFT。久万高原町を応援したい方向けの関係人口制度です。",
    price: "要確認",
    status: "要確認",
    target: "久万高原町外在住者・地域ファン",
    benefits: ["地域特典"],
    benefitCategories: ["tourism", "experience"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.kumakogen.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "bandai-fukushima",
    slug: "bandai-fukushima",
    region: "東北",
    prefecture: "福島県",
    municipality: "磐梯町",
    programName: "ふるさと住民登録制度・デジタル住民票",
    type: "アプリ型",
    summary:
      "マイナンバーカード等を活用した、ふるさと住民登録制度に関連するデジタル住民票。磐梯町への関係人口創出を目的としています。",
    price: "要確認",
    status: "要確認",
    target: "磐梯町外在住者・関係人口",
    benefits: ["地域情報の提供", "関係人口向けサービス"],
    benefitCategories: ["info", "community"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.town.bandai.fukushima.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: true,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "kashima-saga",
    slug: "kashima-saga",
    region: "九州・沖縄",
    prefecture: "佐賀県",
    municipality: "鹿島市",
    programName: "鹿島デジタル住民NFT",
    type: "デジタル住民NFT",
    summary:
      "鹿島市のデジタル住民として地域を応援するNFT。鹿島市の関係人口拡大に向けた取り組みです。",
    price: "要確認",
    status: "要確認",
    target: "鹿島市外在住者・地域ファン",
    benefits: ["地域ファン向け特典"],
    benefitCategories: ["community", "food"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.city.saga-kashima.lg.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "nachikatsuura-wakayama",
    slug: "nachikatsuura-wakayama",
    region: "近畿",
    prefecture: "和歌山県",
    municipality: "那智勝浦町",
    programName: "デジタル住民NFTアンバサダーカード",
    type: "デジタル住民NFT",
    summary:
      "デジタル住民NFTアンバサダー企画に関連する制度。那智勝浦町の魅力を広めるアンバサダー向け制度です。",
    price: "要確認",
    status: "要確認",
    target: "那智勝浦町のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "tourism"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.town.nachikatsuura.wakayama.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "uda-nara",
    slug: "uda-nara",
    region: "近畿",
    prefecture: "奈良県",
    municipality: "宇陀市",
    programName: "デジタル住民NFTアンバサダーカード",
    type: "デジタル住民NFT",
    summary:
      "自治体と継続的に関わるデジタル住民向け制度。宇陀市のアンバサダーとして地域の魅力発信を担います。",
    price: "要確認",
    status: "要確認",
    target: "宇陀市のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "experience"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.city.uda.nara.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "joyo-kyoto",
    slug: "joyo-kyoto",
    region: "近畿",
    prefecture: "京都府",
    municipality: "城陽市",
    programName: "デジタル住民NFTアンバサダーカード",
    type: "デジタル住民NFT",
    summary:
      "デジタル住民NFTアンバサダー企画に関連する制度。城陽市の関係人口拡大・地域ファンづくりを目的としています。",
    price: "要確認",
    status: "要確認",
    target: "城陽市のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "tourism"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.city.joyo.kyoto.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "kamigori-hyogo",
    slug: "kamigori-hyogo",
    region: "近畿",
    prefecture: "兵庫県",
    municipality: "上郡町",
    programName: "デジタル住民NFTアンバサダーカード",
    type: "デジタル住民NFT",
    summary:
      "デジタル住民NFTアンバサダー企画に関連する制度。上郡町の魅力を広めるアンバサダー向け制度です。",
    price: "要確認",
    status: "要確認",
    target: "上郡町のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "experience"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.town.kamigori.hyogo.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "mashiko-tochigi",
    slug: "mashiko-tochigi",
    region: "関東",
    prefecture: "栃木県",
    municipality: "益子町",
    programName: "デジタル住民NFTアンバサダーカード",
    type: "デジタル住民NFT",
    summary:
      "デジタル住民NFTアンバサダー企画に関連する制度。益子焼で有名な益子町のアンバサダー向け制度です。",
    price: "要確認",
    status: "要確認",
    target: "益子町のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "experience", "tourism"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.town.mashiko.lg.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: true,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "otsuki-yamanashi",
    slug: "otsuki-yamanashi",
    region: "中部",
    prefecture: "山梨県",
    municipality: "大月市",
    programName: "デジタル住民NFTアンバサダーカード",
    type: "デジタル住民NFT",
    summary:
      "デジタル住民NFTアンバサダー企画に関連する制度。大月市のアンバサダーとして地域を応援できます。",
    price: "要確認",
    status: "要確認",
    target: "大月市のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "tourism"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.city.otsuki.yamanashi.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "fujikawa-yamanashi",
    slug: "fujikawa-yamanashi",
    region: "中部",
    prefecture: "山梨県",
    municipality: "富士川町",
    programName: "デジタル住民NFTアンバサダーカード",
    type: "デジタル住民NFT",
    summary:
      "デジタル住民票として案内されている地域ファン向け制度。富士川町のアンバサダーとして地域の魅力を広めます。",
    price: "要確認",
    status: "要確認",
    target: "富士川町のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "tourism"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.town.fujikawa.yamanashi.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "toyama-toyama",
    slug: "toyama-toyama",
    region: "中部",
    prefecture: "富山県",
    municipality: "富山市",
    programName: "TOYAMAみらい市民パスポート",
    type: "デジタル住民証",
    summary:
      "富山県外在住者向けのデジタル登録証。富山市のまちづくりに関心のある方が関係人口として参加できる制度です。",
    price: "要確認",
    status: "要確認",
    target: "富山市外在住者・富山市に関心のある方",
    benefits: ["地域情報の提供", "関係人口向け特典"],
    benefitCategories: ["info", "community"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.city.toyama.lg.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: true,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "ishioka-ibaraki",
    slug: "ishioka-ibaraki",
    region: "関東",
    prefecture: "茨城県",
    municipality: "石岡市",
    programName: "いしおかファンクラブ デジタル会員NFT",
    type: "デジタル会員証",
    summary:
      "石岡市に関心がある人向けのデジタル会員NFT。ファンクラブ会員として地域を応援できる制度です。",
    price: "要確認",
    status: "要確認",
    target: "石岡市ファン・地域に関心のある方",
    benefits: ["ファンクラブ会員向け特典"],
    benefitCategories: ["community", "event"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.city.ishioka.lg.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
  {
    id: "ogawa-saitama",
    slug: "ogawa-saitama",
    region: "関東",
    prefecture: "埼玉県",
    municipality: "小川町",
    programName: "道の駅おがわまちデジタル会員証",
    type: "デジタル会員証",
    summary:
      "地域施設や地域ファン向けのデジタル会員証。道の駅おがわまちを拠点とした地域ファンづくりの取り組みです。",
    price: "要確認",
    status: "要確認",
    target: "小川町・道の駅おがわまちのファン",
    benefits: ["道の駅関連の特典"],
    benefitCategories: ["food", "coupon", "tourism"],
    benefitConditions:
      "特典の内容・利用条件は公式ページをご確認ください。変更される場合があります。",
    applicationMethod: "公式ページよりご確認ください。",
    officialUrl: "https://www.town.ogawa.saitama.jp/",
    lastChecked: "2026-06-01",
    notes:
      "本ページの情報は公式ページ等で公表されている内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
];

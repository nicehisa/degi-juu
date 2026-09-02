export type MunicipalityType =
  | "デジタル住民票"
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
  imageUrl?: string;
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
      "西川町の公表情報をもとにしたデジタル住民票NFTの掲載情報です。地域を応援する関係人口向けの制度として案内されています。",
    price: "3,000円",
    status: "終了",
    target: "西川町外在住者・地域ファン",
    benefits: ["限定コミュニティへの参加", "地域特典", "イベント案内・優先参加"],
    benefitCategories: ["community", "event", "info"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.town.nishikawa.yamagata.jp/soshiki/kasegu/4554.html",
    relatedUrl: "https://www.town.nishikawa.yamagata.jp/soshiki/kasegu/1424.html",
    imageUrl: "https://www.town.nishikawa.yamagata.jp/uploaded/image/1933.png",
    lastChecked: "2026-08-31",
    notes:
      "一次販売は終了しています。二次取引の有無や特典の利用条件は、自治体ページまたはHEXAの最新情報をご確認ください。",
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
    price: "1,000円",
    status: "終了",
    target: "美祢市外在住者・地域ファン",
    benefits: ["観光施設関連の特典", "地域関連の特典"],
    benefitCategories: ["tourism", "info"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://nft.hexanft.com/nftmaticmulti/2",
    relatedUrl: "https://hexanft.com/mndigital/",
    imageUrl: "https://www2.city.mine.lg.jp/material/images/group/1/mvbnr1.png",
    lastChecked: "2026-08-31",
    notes:
      "一次販売は終了しています。二次取引の有無や特典の利用条件は、HEXAおよび関連公式情報をご確認ください。",
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
    price: "1,000円",
    status: "終了",
    target: "匝瑳市外在住者・地域ファン",
    benefits: ["地域ファン向け特典", "地域情報の提供"],
    benefitCategories: ["info", "community"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.city.sosa.lg.jp/page/page005240.html",
    imageUrl: "https://www.city.sosa.lg.jp/data/img/1708588867_109.png?1708588870929",
    lastChecked: "2026-08-31",
    notes:
      "一次販売は終了しています。二次取引の有無や特典の利用条件は、自治体ページまたはHEXAの最新情報をご確認ください。",
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
    price: "1,000円",
    status: "終了",
    target: "安芸高田市外在住者・地域ファン",
    benefits: ["地域特典", "イベント関連特典"],
    benefitCategories: ["event", "info"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.akitakata.jp/akitakata-media/filer_public/bd/39/bd399e08-5616-4764-828c-ea5b219aa8cb/shiryou-11_aki-takadashi-dejitaru-juuminhyou-no-hakkou.pdf",
    imageUrl: "https://www.akitakata.jp/akitakata-media/filer_public_thumbnails/filer_public/36/2f/362ff9b5-c670-45ec-8865-d59f79a145fb/kagura.jpg__1300x867_q85_subsampling-2.jpg",
    lastChecked: "2026-08-31",
    notes:
      "抽選販売の受付期間は終了しています。二次取引の有無や特典の利用条件は、公式発表およびHEXAの最新情報をご確認ください。",
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
    price: "1,000円",
    status: "終了",
    target: "羽曳野市外在住者・地域ファン",
    benefits: ["地域特典"],
    benefitCategories: ["info"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.city.habikino.lg.jp/soshiki/toshimiryoku/miryoku/news/15890.html",
    imageUrl: "https://www.city.habikino.lg.jp/material/images/group/90/topsekaiisann.jpg",
    lastChecked: "2026-08-31",
    notes:
      "購入申込期間は終了し、現在は二次取引開始後の案内ページです。最新の取引可否と特典条件は公式ページをご確認ください。",
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
    price: "1,000円",
    status: "終了",
    target: "八千代町外在住者・地域ファン",
    benefits: ["地域関連の特典"],
    benefitCategories: ["info", "food"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.town.ibaraki-yachiyo.lg.jp/sp/page/page011204.html",
    relatedUrl: "https://nft.hexanft.com/users/ey2S9AElqcUyiR/issued",
    imageUrl: "https://www.town.ibaraki-yachiyo.lg.jp/data/top_photo/1780539395_161.jpg",
    lastChecked: "2026-08-31",
    notes:
      "公式ページで完売による販売終了が案内されています。特典の利用条件は公式ページをご確認ください。",
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
      "久万高原町の公表情報をもとにしたデジタル住民票NFTの掲載情報です。久万高原町を応援したい方向けの関係人口制度として案内されています。",
    price: "1,000円",
    status: "終了",
    target: "久万高原町外在住者・地域ファン",
    benefits: ["地域特典"],
    benefitCategories: ["tourism", "experience"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.kumakogen.jp/soshiki/17/24272.html",
    relatedUrl: "https://nft.hexanft.com/nftmaticmulti/313",
    imageUrl: "https://www.kumakogen.jp/uploaded/image/8569.png",
    lastChecked: "2026-08-31",
    notes:
      "公式ページで制度概要を確認済みです。現在の募集・取得可否はリンク先の運営ページで最新情報をご確認ください。",
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
    type: "デジタル住民票",
    summary:
      "磐梯町への関係人口創出を目的とした、地域とのつながりを示すデジタル制度です。",
    price: "要確認",
    status: "要確認",
    target: "磐梯町外在住者・関係人口",
    benefits: ["地域情報の提供", "関係人口向けサービス"],
    benefitCategories: ["info", "community"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.town.bandai.fukushima.jp/site/shiawase-redesign/bandai_furusato_residents.html",
    imageUrl: "https://www.town.bandai.fukushima.jp/uploaded/banner/29_img1.jpg",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "3,000円",
    status: "販売中",
    target: "鹿島市外在住者・地域ファン",
    benefits: ["地域ファン向け特典"],
    benefitCategories: ["community", "food"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.kashimacity.com/information/4134/",
    imageUrl: "https://www.city.saga-kashima.lg.jp/all_img/org/photo_slide_img01.webp",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "3,000円〜",
    status: "販売中",
    target: "那智勝浦町のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "tourism"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.town.nachikatsuura.wakayama.jp/info/1608",
    relatedUrl: "https://nft.hexanft.com/users/KR5quhMloDiBhY/issued/%E5%92%8C%E6%AD%8C%E5%B1%B1%E7%9C%8C%E9%82%A3%E6%99%BA%E5%8B%9D%E6%B5%A6%E7%94%BA",
    imageUrl: "https://www.town.nachikatsuura.wakayama.jp/div/admin/image/topnews/main/01.jpg",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "3,000円〜",
    status: "販売中",
    target: "宇陀市のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "experience"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.city.uda.lg.jp/soshiki/23/15322.html",
    relatedUrl: "https://nft.hexanft.com/users/KR5quhMloDiBhY/issued/%E5%A5%88%E8%89%AF%E7%9C%8C%E5%AE%87%E9%99%80%E5%B8%82",
    imageUrl: "https://www.city.uda.lg.jp/uploaded/banner/35_img1.jpg",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "3,000円〜",
    status: "販売中",
    target: "城陽市のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "tourism"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://nft.hexanft.com/users/KR5quhMloDiBhY/issued/%E4%BA%AC%E9%83%BD%E5%BA%9C%E5%9F%8E%E9%99%BD%E5%B8%82",
    relatedUrl: "https://prtimes.jp/main/html/rd/p/000000212.000046191.html",
    imageUrl: "https://www.city.joyo.kyoto.jp/cmsfiles/img_list/112.jpg",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "3,000円〜",
    status: "販売中",
    target: "上郡町のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "experience"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://nft.hexanft.com/users/KR5quhMloDiBhY/issued/%E5%85%B5%E5%BA%AB%E7%9C%8C%E4%B8%8A%E9%83%A1%E7%94%BA",
    relatedUrl: "https://cclg.or.jp/2024/12/05/cclg-local-goverment-nftproject-2/",
    imageUrl: "https://www.town.kamigori.hyogo.jp/material/images/group/1/kamigorikawamaturi_44_bana-1.jpg",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "3,000円〜",
    status: "販売中",
    target: "益子町のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "experience", "tourism"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://nft.hexanft.com/users/KR5quhMloDiBhY/issued/%E6%A0%83%E6%9C%A8%E7%9C%8C%E7%9B%8A%E5%AD%90%E7%94%BA",
    relatedUrl: "https://cclg.or.jp/2024/12/05/cclg-local-goverment-nftproject-2/",
    imageUrl: "https://www.town.mashiko.lg.jp/data/top_photo/1768536182_126.jpg",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "3,000円〜",
    status: "販売中",
    target: "大月市のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "tourism"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://nft.hexanft.com/users/KR5quhMloDiBhY/issued/%E5%B1%B1%E6%A2%A8%E7%9C%8C%E5%A4%A7%E6%9C%88%E5%B8%82",
    relatedUrl: "https://cclg.or.jp/2024/12/28/cclg-local-goverment-nftproject-ootsuki/",
    imageUrl: "https://www.city.otsuki.yamanashi.jp/images/bg_mv.jpg",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "3,000円〜",
    status: "販売中",
    target: "富士川町のアンバサダー希望者・地域ファン",
    benefits: ["アンバサダー向け特典"],
    benefitCategories: ["community", "tourism"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.town.fujikawa.yamanashi.jp/docs/2024120600047/",
    relatedUrl: "https://nft.hexanft.com/users/KR5quhMloDiBhY/issued/%E5%B1%B1%E6%A2%A8%E7%9C%8C%E5%AF%8C%E5%A3%AB%E5%B7%9D%E7%94%BA",
    imageUrl: "https://www.town.fujikawa.yamanashi.jp/_files/00000048/bnr_kanko.png",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "1,000円",
    status: "販売中",
    target: "富山市外在住者・富山市に関心のある方",
    benefits: ["地域情報の提供", "関係人口向け特典"],
    benefitCategories: ["info", "community"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.city.toyama.lg.jp/shisei/seisaku/1010755/1018213.html",
    relatedUrl: "https://nft.hexanft.com/nftmaticmulti/1132",
    imageUrl: "https://www.city.toyama.lg.jp/_res/projects/default_project/_page_/001/000/001/main/main01-2.jpg",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "1,000円",
    status: "販売中",
    target: "石岡市ファン・地域に関心のある方",
    benefits: ["ファンクラブ会員向け特典"],
    benefitCategories: ["community", "event"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.ishioka-kankou.com/ishioka-fanclub/",
    relatedUrl: "https://nft.hexanft.com/nftmaticmulti/863",
    imageUrl: "https://www.city.ishioka.lg.jp/data/top_photo/1760924562_233.jpg",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
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
    price: "1,000円",
    status: "販売中",
    target: "小川町・道の駅おがわまちのファン",
    benefits: ["道の駅関連の特典"],
    benefitCategories: ["food", "coupon", "tourism"],
    benefitConditions:
      "特典の内容・利用条件はリンク先をご確認ください。変更される場合があります。",
    applicationMethod: "公式・販売ページよりご確認ください。",
    officialUrl: "https://www.kankou-ogawa.com/topic?_anch_=427&id=1",
    relatedUrl: "https://nft.hexanft.com/nftmaticmulti/332",
    imageUrl: "https://www.town.ogawa.saitama.jp/theme/base/img_top/img_kurashi.png",
    lastChecked: "2026-08-31",
    notes:
      "本ページの情報は自治体・発行元・販売元などが公表している内容をもとに整理しています。価格・販売状況・特典は変更される場合があります。",
    isOfficialInfo: false,
    isFeatured: false,
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
  },
];

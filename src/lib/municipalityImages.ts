import type { Municipality } from "@/data/municipalities";

type MunicipalityImage = {
  src: string;
  alt: string;
  label: string;
  credit?: string;
  sourceUrl?: string;
  licenseName?: string;
  licenseUrl?: string;
  isRepresentative: boolean;
};

type StockImageKey =
  | "riceRoad"
  | "riceDusk"
  | "mountainClouds"
  | "islandRoad"
  | "mountainMist";

const stockImages: Record<StockImageKey, MunicipalityImage> = {
  riceRoad: {
    src: "/images/stock/japan-rice-road.jpg",
    alt: "田園風景のイメージ画像",
    label: "イメージ画像",
    credit: "Pixabay / dep377",
    sourceUrl: "https://pixabay.com/photos/countryside-rice-fields-dirt-road-6632824/",
    licenseName: "Pixabay Content License",
    licenseUrl: "https://pixabay.com/service/license-summary/",
    isRepresentative: false,
  },
  riceDusk: {
    src: "/images/stock/japan-rice-dusk.jpg",
    alt: "夕暮れの田園風景のイメージ画像",
    label: "イメージ画像",
    credit: "Pixabay / dep377",
    sourceUrl: "https://pixabay.com/photos/rice-field-japan-asia-rice-dusk-7493453/",
    licenseName: "Pixabay Content License",
    licenseUrl: "https://pixabay.com/service/license-summary/",
    isRepresentative: false,
  },
  mountainClouds: {
    src: "/images/stock/japan-mountain-clouds.jpg",
    alt: "山間部の風景のイメージ画像",
    label: "イメージ画像",
    credit: "Pixabay / DeltaWorks",
    sourceUrl: "https://pixabay.com/photos/sea-of-clouds-japan-kumamoto-aso-542449/",
    licenseName: "Pixabay Content License",
    licenseUrl: "https://pixabay.com/service/license-summary/",
    isRepresentative: false,
  },
  islandRoad: {
    src: "/images/stock/japan-island-road.jpg",
    alt: "海沿いの道のイメージ画像",
    label: "イメージ画像",
    credit: "Pixabay / fujikama",
    sourceUrl: "https://pixabay.com/photos/japan-okinawa-landscape-island-1258893/",
    licenseName: "Pixabay Content License",
    licenseUrl: "https://pixabay.com/service/license-summary/",
    isRepresentative: false,
  },
  mountainMist: {
    src: "/images/stock/japan-mountain-mist.jpg",
    alt: "霧がかかる山のイメージ画像",
    label: "イメージ画像",
    credit: "Pixabay / yamabon",
    sourceUrl: "https://pixabay.com/photos/sea-of-clouds-mountain-natural-4646744/",
    licenseName: "Pixabay Content License",
    licenseUrl: "https://pixabay.com/service/license-summary/",
    isRepresentative: false,
  },
};

const regionFallbacks: Record<string, StockImageKey[]> = {
  東北: ["riceRoad", "mountainMist", "riceDusk"],
  関東: ["riceRoad", "riceDusk", "mountainMist"],
  中部: ["mountainMist", "riceRoad", "mountainClouds"],
  近畿: ["riceRoad", "mountainClouds", "riceDusk"],
  中国: ["mountainClouds", "riceRoad", "riceDusk"],
  四国: ["mountainMist", "riceRoad", "mountainClouds"],
  九州: ["islandRoad", "mountainClouds", "riceDusk"],
  沖縄: ["islandRoad", "mountainClouds", "riceRoad"],
};

export function getMunicipalityImage(municipality: Municipality): MunicipalityImage {
  if (
    municipality.imageUrl &&
    (municipality.imagePermissionStatus === "permitted" ||
      municipality.imagePermissionStatus === "free-stock")
  ) {
    return {
      src: municipality.imageUrl,
      alt:
        municipality.imageAlt ||
        `${municipality.prefecture}${municipality.municipality}の掲載許諾確認済み画像`,
      label:
        municipality.imagePermissionStatus === "permitted"
          ? "掲載許諾確認済み"
          : "イメージ画像",
      credit: municipality.imageCredit,
      sourceUrl: municipality.imageSourceUrl,
      isRepresentative: municipality.imagePermissionStatus === "permitted",
    };
  }

  return stockImages[pickFallbackImageKey(municipality)];
}

function pickFallbackImageKey(municipality: Municipality): StockImageKey {
  const keys = regionFallbacks[municipality.region] || ["riceRoad", "mountainMist", "islandRoad"];
  const charSum = Array.from(municipality.id).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0
  );

  return keys[charSum % keys.length];
}

import type { MetadataRoute } from "next";
import { benefitCategories } from "@/data/benefitCategories";
import { municipalities } from "@/data/municipalities";
import { regions } from "@/data/regions";

const baseUrl = "https://degi-juu.vercel.app";

const staticPaths = [
  "",
  "/about",
  "/advertise",
  "/advertising-policy",
  "/benefits",
  "/company",
  "/compare",
  "/contact",
  "/difference",
  "/editorial-policy",
  "/faq",
  "/legal",
  "/listing-request",
  "/municipalities",
  "/privacy",
  "/regions",
  "/types",
  "/updates",
];

function page(path: string, priority = 0.6): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const prefectures = Array.from(new Set(municipalities.map((item) => item.prefecture)));

  return [
    ...staticPaths.map((path) => page(path, path === "" ? 1 : 0.7)),
    ...municipalities.map((item) => page(`/municipalities/${item.slug}`, 0.9)),
    ...regions.map((item) => page(`/regions/${item.slug}`, 0.75)),
    ...benefitCategories.map((item) => page(`/benefits/${item.slug}`, 0.75)),
    ...prefectures.map((prefecture) => page(`/prefectures/${encodeURIComponent(prefecture)}`, 0.75)),
  ];
}

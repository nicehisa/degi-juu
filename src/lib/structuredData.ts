import type { FAQ } from "@/data/faqs";

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildFaqJsonLd(questions: readonly FAQ[], id: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": id,
    inLanguage: "ja",
    mainEntity: questions.map(({ q, a }) => ({
      "@type": "Question", name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function getOrganizationJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "フォーティテュード ジャパン株式会社",
    legalName: "フォーティテュード ジャパン株式会社",
    url: `${siteUrl}/company`,
    address: {
      "@type": "PostalAddress", postalCode: "150-0044",
      addressRegion: "東京都", addressLocality: "渋谷区",
      streetAddress: "円山町5-5 Navi渋谷ビル3F", addressCountry: "JP",
    },
    telephone: "03-5050-4335",
    email: "info@digijuu.jp",
    foundingDate: "2022",
  };
}

export function buildBreadcrumbJsonLd(items: readonly { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, url }, index) => ({
      "@type": "ListItem", position: index + 1, name, item: url,
    })),
  };
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営会社｜デジじゅう",
  description:
    "デジじゅうを運営するフォーティテュード ジャパン株式会社の会社情報です。",
};

const companyRows = [
  { label: "会社名", value: "フォーティテュード ジャパン株式会社" },
  { label: "代表者", value: "大久保 尚" },
  { label: "所在地", value: "〒150-0044 東京都渋谷区円山町5-5 Navi渋谷ビル3F" },
  { label: "設立", value: "2022年" },
  {
    label: "事業内容",
    value: "企業顧問、AI事業、マーケティング事業、広告代理業、健康食品販売",
  },
  { label: "電話番号", value: "03-5050-4335" },
  { label: "メール", value: "info@fortitudejapan.com" },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "フォーティテュード ジャパン株式会社",
  founder: "大久保 尚",
  address: {
    "@type": "PostalAddress",
    postalCode: "150-0044",
    addressRegion: "東京都",
    addressLocality: "渋谷区",
    streetAddress: "円山町5-5 Navi渋谷ビル3F",
    addressCountry: "JP",
  },
  telephone: "03-5050-4335",
  email: "info@fortitudejapan.com",
  foundingDate: "2022",
};

export default function CompanyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">運営者情報</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">運営会社</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          デジじゅうは、全国のデジタル住民制度を比較・確認しやすくすることを目的に運営しています。
          掲載内容の修正依頼やお問い合わせは、お問い合わせフォームよりご連絡ください。
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">
        <h2 className="text-lg font-bold text-navy">会社情報</h2>
        <dl className="mt-5 divide-y divide-gray-200">
          {companyRows.map((row) => (
            <div key={row.label} className="grid gap-1 py-4 md:grid-cols-[160px_1fr] md:gap-6">
              <dt className="text-sm font-semibold text-gray-600">{row.label}</dt>
              <dd className="text-sm leading-relaxed text-gray-900">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-base font-bold text-amber-900">掲載情報について</h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-900">
          デジじゅうは自治体公式サイトではありません。制度内容、申込条件、販売状況、特典内容などは変更される場合があります。
          参加前には必ず各自治体または発行元の公式ページをご確認ください。
        </p>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          お問い合わせ・掲載修正依頼
        </Link>
        <Link
          href="/editorial-policy"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          掲載基準・編集方針を見る
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/data/faqs";
import JsonLd from "@/components/JsonLd";
import { buildFaqJsonLd } from "@/lib/structuredData";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "よくある質問｜デジじゅう",
  description:
    "デジタル住民票、デジタル住民NFT、ふるさと納税、税控除、特典、公式ページ確認についてのよくある質問です。",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={buildFaqJsonLd(faqs, `${getSiteUrl()}/faq#faq`)} />
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">誤認防止・不安解消</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">よくある質問</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          デジタル住民制度を検討する前に確認しておきたい基本情報をまとめています。
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <section key={faq.q} className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-base font-bold text-navy">{faq.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{faq.a}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-5">
        <h2 className="font-bold text-navy">掲載情報の確認・修正について</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          掲載情報に誤りや更新がある場合は、公式情報のURLを添えてお問い合わせください。
        </p>
        <Link href="/contact" className="mt-4 inline-flex rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
          問い合わせる
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { municipalities } from "@/data/municipalities";
import { StatusBadge, TypeBadge } from "@/components/Badge";
import CTAButton from "@/components/CTAButton";
import LegalNoticeBox from "@/components/LegalNoticeBox";
import MunicipalityCard from "@/components/MunicipalityCard";
import PromotionSlot from "@/components/PromotionSlot";
import { getActivePromotions } from "@/data/promotions";
import { getMunicipalityImage } from "@/lib/municipalityImages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return municipalities.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = municipalities.find((x) => x.slug === slug);
  if (!m) return {};
  return {
    title: `${m.municipality}（${m.prefecture}）${m.programName}｜デジじゅう`,
    description: m.summary,
  };
}

export default async function MunicipalityDetailPage({ params }: Props) {
  const { slug } = await params;
  const m = municipalities.find((x) => x.slug === slug);
  if (!m) notFound();

  const related = municipalities
    .filter((x) => x.slug !== m.slug && (x.type === m.type || x.prefecture === m.prefecture))
    .slice(0, 3);
  const promotions = getActivePromotions("municipality-detail");
  const image = getMunicipalityImage(m);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-1.5">
        <Link href="/" className="hover:text-blue-600">トップ</Link>
        <span>/</span>
        <Link href="/municipalities" className="hover:text-blue-600">自治体一覧</Link>
        <span>/</span>
        <span className="text-gray-700">{m.municipality}</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-6 md:p-8 text-white mb-6">
        <p className="text-blue-200 text-sm mb-1">{m.prefecture}</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{m.municipality}</h1>
        <p className="text-blue-100 text-base mb-4">{m.programName}</p>
        <div className="flex flex-wrap gap-2">
          <TypeBadge type={m.type} />
          <StatusBadge status={m.status} />
        </div>
      </div>

      {m.status !== "販売中" && m.status !== "受付中" && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-5">
          <h2 className="text-lg text-amber-950">{m.status === "終了" ? "掲載している募集は終了しています" : "現在の受付状況をご確認ください"}</h2>
          <p className="mt-2 text-base leading-7 text-amber-900">{m.status === "終了" ? "このページには募集時の情報を掲載しています。再募集や二次取引の有無は、募集元の案内をご確認ください。" : "参加できるかどうか、最新の費用や特典とあわせて公式サイトでご確認ください。"}</p>
          <Link href="/municipalities" className="mt-3 inline-flex min-h-11 items-center font-semibold text-blue-700 underline">ほかの制度を探す →</Link>
        </div>
      )}

      {/* Notice */}
      <LegalNoticeBox
        text="本ページの情報は、自治体・発行元・販売元などが公表している情報をもとに整理しています。最新情報、購入条件、特典内容、販売状況は必ずリンク先でご確認ください。"
        className="mb-6"
      />

      {/* Details */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <table className="w-full text-base">
          <tbody>
            {[
              { label: "都道府県", value: m.prefecture },
              { label: "自治体名", value: m.municipality },
              { label: "制度名", value: m.programName },
              { label: "種別", value: <TypeBadge type={m.type} /> },
              { label: "受付状況", value: <StatusBadge status={m.status} /> },
              { label: m.status === "終了" ? "募集時の費用" : "参加費用", value: m.price },
              { label: "対象者", value: m.target },
              { label: "情報確認日", value: m.lastChecked },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <th className="px-4 py-3 text-left text-gray-600 font-medium w-28 md:w-40 border-r border-gray-100">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-gray-800">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="relative aspect-[16/9] bg-gray-100">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 768px) 896px, 100vw"
            className="object-cover"
          />
          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
            {image.label}
          </div>
        </div>
        <div className="flex flex-col gap-1 border-t border-gray-100 px-4 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {image.isRepresentative
              ? "掲載元の許諾確認済み画像です。"
              : "自治体の実際の写真ではなく、地域イメージを伝えるための画像です。"}
          </span>
          {image.sourceUrl && (
            <a
              href={image.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              画像出典を確認
            </a>
          )}
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            name: `${m.municipality} ${m.programName}`,
            description: m.summary,
            dateModified: m.lastChecked,
          }),
        }}
      />

      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-bold text-gray-800 mb-2">概要</h2>
        <p className="text-base text-gray-700 leading-8">{m.summary}</p>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-bold text-gray-800 mb-3">主な特典（公表内容）</h2>
        <ul className="space-y-2 mb-4">
          {m.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-base text-gray-700">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
          <strong>特典についての注意：</strong> {m.benefitConditions}
        </div>
      </div>

      <section className="bg-white rounded-xl border border-gray-200 p-5 mb-6" aria-labelledby="application-method">
        <h2 id="application-method" className="text-lg text-navy">参加方法・必要な準備</h2>
        <p className="mt-3 text-base leading-8 text-gray-700">{m.applicationMethod}</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-gray-700">
          <li>対象者・受付状況と、費用・特典の利用条件を確認してください。</li>
          <li>決済方法やアカウント登録の要否は、申込先で確認してください。NFTを使う制度では、ウォレットの準備が必要かも確認しましょう。</li>
          <li>デジじゅうでは申込・購入を受け付けていません。手続きは自治体・発行元の案内に沿って行ってください。</li>
        </ul>
      </section>

      {/* Official Links */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-bold text-gray-800 mb-3">情報の出典・公式サイト</h2>
        <p className="mb-3 text-xs leading-relaxed text-gray-500">
          リンク先には自治体ページのほか、制度運営元・販売プラットフォームのページが含まれる場合があります。
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <CTAButton
            href={m.officialUrl}
            variant="secondary"
            external
            className="flex-1 justify-center"
          >
            {m.status === "終了" ? "募集元の最新案内を確認する" : "公式サイトで参加条件を確認する"}
          </CTAButton>
          {m.relatedUrl && (
            <CTAButton
              href={m.relatedUrl}
              variant="outline"
              external
              className="flex-1 justify-center"
            >
              関連情報を確認
            </CTAButton>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-8 text-xs text-gray-600 leading-relaxed">
        <strong>注意事項：</strong> {m.notes}
      </div>

      {promotions.length > 0 && (
        <div className="mb-8 space-y-3">
          {promotions.map((promotion) => (
            <PromotionSlot key={promotion.id} promotion={promotion} />
          ))}
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-navy mb-4">類似の制度</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <MunicipalityCard key={r.id} municipality={r} />
            ))}
          </div>
        </div>
      )}

      {/* Back */}
      <div className="text-center">
        <Link
          href="/municipalities"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          ← 自治体一覧に戻る
        </Link>
      </div>
    </div>
  );
}

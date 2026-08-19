import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { municipalities } from "@/data/municipalities";
import { StatusBadge, TypeBadge } from "@/components/Badge";
import CTAButton from "@/components/CTAButton";
import LegalNoticeBox from "@/components/LegalNoticeBox";
import MunicipalityCard from "@/components/MunicipalityCard";
import PromotionSlot from "@/components/PromotionSlot";
import { getActivePromotions } from "@/data/promotions";

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-1.5">
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

      {/* Notice */}
      <LegalNoticeBox
        text="本ページの情報は、公式ページ等で公表されている内容をもとに整理しています。最新情報、購入条件、特典内容、販売状況は必ず公式ページをご確認ください。"
        className="mb-6"
      />

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

      {/* Details */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <table className="w-full text-sm">
          <tbody>
            {[
              { label: "都道府県", value: m.prefecture },
              { label: "自治体名", value: m.municipality },
              { label: "制度名", value: m.programName },
              { label: "種別", value: <TypeBadge type={m.type} /> },
              { label: "販売状況", value: <StatusBadge status={m.status} /> },
              { label: "価格", value: m.price },
              { label: "対象者", value: m.target },
              { label: "確認日", value: m.lastChecked },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <th className="px-4 py-3 text-left text-gray-500 font-medium w-32 md:w-40 border-r border-gray-100">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-gray-800">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-bold text-gray-800 mb-2">概要</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{m.summary}</p>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-bold text-gray-800 mb-3">主な特典（公表内容）</h2>
        <ul className="space-y-2 mb-4">
          {m.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
          <strong>特典についての注意：</strong> {m.benefitConditions}
        </div>
      </div>

      {/* Official Links */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-bold text-gray-800 mb-3">公式ページ・関連リンク</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <CTAButton
            href={m.officialUrl}
            variant="secondary"
            external
            className="flex-1 justify-center"
          >
            公式ページを見る
          </CTAButton>
          {m.relatedUrl && (
            <CTAButton
              href={m.relatedUrl}
              variant="outline"
              external
              className="flex-1 justify-center"
            >
              関連ページを見る
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

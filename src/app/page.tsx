import type { Metadata } from "next";
import Link from "next/link";
import { municipalities } from "@/data/municipalities";
import { regions } from "@/data/regions";
import { benefitCategories } from "@/data/benefitCategories";
import MunicipalityCard from "@/components/MunicipalityCard";
import CTAButton from "@/components/CTAButton";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "デジじゅう｜全国のデジタル住民票・デジタル住民NFTを地域と特典から探せるサイト",
  description:
    "デジじゅうは、全国のデジタル住民票、デジタル住民NFT、デジタル住民証、地域ファン向け会員証を、地域・特典・価格・制度タイプから比較できる情報サイトです。",
};

const FEATURED = municipalities.filter((m) => m.isFeatured).slice(0, 6);

const COMPARISON_ROWS = [
  { item: "主な目的", digital: "地域との継続的なつながり", furusato: "自治体への寄付" },
  { item: "税控除", digital: "原則なし", furusato: "条件によりあり" },
  { item: "法律上の住民票", digital: "取得できない", furusato: "取得できない" },
  { item: "特典", digital: "自治体・発行元により異なる", furusato: "返礼品がある場合がある" },
  { item: "申込先", digital: "公式ページ・発行元", furusato: "ふるさと納税サイト等" },
];

const NEWS = [
  { date: "2026-06-01", label: "お知らせ", text: "デジじゅうβ版をリリースしました。全国19自治体の情報を掲載しています。" },
  { date: "2026-06-01", label: "更新", text: "地域から探す・特典から探す・制度タイプから探すページを追加しました。" },
  { date: "2026-06-01", label: "更新", text: "掲載情報は随時更新予定です。修正依頼・掲載依頼はお問い合わせフォームからお送りください。" },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "デジじゅう",
            description: "全国のデジタル住民票・デジタル住民NFT・デジタル住民証を比較できる情報サイト",
            url: "https://degi-juu.vercel.app",
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
              ⚠ 法律上の住民票ではありません
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
              ⚠ ふるさと納税とは異なり、原則として税控除の対象ではありません
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            全国のデジタル住民制度を、
            <br className="hidden sm:block" />
            地域と特典から探せるサイト
            <span className="block mt-2 text-yellow-300 text-2xl md:text-4xl">「デジじゅう」</span>
          </h1>
          <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed">
            デジタル住民票・デジタル住民NFT・地域ファン向け会員証を、
            <br className="hidden md:block" />
            自治体・特典・価格・制度タイプから比較できます。
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <CTAButton href="/regions" variant="secondary" className="text-base px-6 py-3">
              🗾 地域から探す
            </CTAButton>
            <CTAButton href="/benefits" variant="secondary" className="text-base px-6 py-3">
              🎁 特典から探す
            </CTAButton>
            <CTAButton href="/municipalities" variant="outline" className="text-base px-6 py-3 border-white text-white hover:bg-white/10">
              一覧を見る
            </CTAButton>
          </div>
        </div>
      </section>

      {/* How to Find */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="3つの探し方" subtitle="あなたに合った方法で制度を見つけてください。" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: "/regions",
                icon: "🗾",
                title: "地域から探す",
                desc: "北海道・東北・関東など、地方・都道府県から制度を探せます。",
                cta: "地域から探す",
              },
              {
                href: "/benefits",
                icon: "🎁",
                title: "特典から探す",
                desc: "観光・宿泊・飲食・イベント・コミュニティなど、特典の内容から探せます。",
                cta: "特典から探す",
              },
              {
                href: "/types",
                icon: "🪙",
                title: "制度タイプから探す",
                desc: "NFT型・アプリ型・デジタル会員証型など、制度の形式から探せます。",
                cta: "タイプから探す",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100 hover:bg-blue-100 transition-colors block"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-block text-sm font-semibold text-blue-700 border border-blue-300 rounded-lg px-4 py-1.5 hover:bg-blue-200 transition-colors">
                  {item.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Region Quick Nav */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="地方から探す" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {regions.map((r) => {
              const count = municipalities.filter((m) => m.region === r.name).length;
              return (
                <Link
                  key={r.id}
                  href={`/municipalities?region=${encodeURIComponent(r.name)}`}
                  className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                  <p className="text-xs text-blue-600 mt-0.5">{count}件</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefit Quick Nav */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="特典から探す" />
          <div className="flex flex-wrap gap-2">
            {benefitCategories.map((cat) => {
              const count = municipalities.filter((m) => m.benefitCategories.includes(cat.id)).length;
              return (
                <Link
                  key={cat.id}
                  href={`/municipalities?benefit=${cat.id}`}
                  className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <span>{cat.icon}</span>
                  <span className="text-gray-700">{cat.name}</span>
                  <span className="text-xs text-blue-600">({count})</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            title="注目の制度"
            subtitle="情報が充実している制度をご紹介しています。ランキングではありません。"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED.map((m) => (
              <MunicipalityCard key={m.id} municipality={m} />
            ))}
          </div>
          <div className="text-center mt-8">
            <CTAButton href="/municipalities" variant="primary" className="px-10 py-3 text-base">
              すべての自治体を見る（{municipalities.length}件）
            </CTAButton>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle title="デジタル住民制度とは？" />
          <div className="bg-blue-50 rounded-xl p-6 md:p-8 border border-blue-100">
            <p className="text-gray-700 leading-relaxed mb-4">
              デジタル住民制度とは、地域外に住む人がデジタル上で自治体や地域とつながり、
              応援・参加できる仕組みです。デジタル住民票NFT、デジタル住民証、
              地域ファン向け会員証など、自治体によって名称や内容は異なります。
            </p>
            <div className="bg-amber-50 border border-amber-300 rounded-lg px-4 py-3 text-xs text-amber-900 mt-4">
              <strong>重要：</strong>
              デジタル住民票という名称が使われる場合でも、住民基本台帳上の住民票ではありません。
              転入・転出・住民登録・行政サービスの利用資格を意味するものではありません。
            </div>
            <div className="mt-4 text-center">
              <CTAButton href="/about" variant="outline">詳しく解説を読む</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Furusato Comparison */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle title="ふるさと納税との違い" subtitle="デジタル住民制度はふるさと納税とは異なる制度です。" />
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-gray-600 font-medium w-32">比較項目</th>
                  <th className="px-4 py-3 text-left text-blue-700 font-semibold">デジタル住民制度</th>
                  <th className="px-4 py-3 text-left text-green-700 font-semibold">ふるさと納税</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-gray-700">{row.item}</td>
                    <td className="px-4 py-3 text-gray-700">{row.digital}</td>
                    <td className="px-4 py-3 text-gray-700">{row.furusato}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <Link href="/difference" className="text-sm text-blue-600 hover:underline">
              詳しい比較を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle title="新着・更新情報" />
          <ul className="space-y-3">
            {NEWS.map((n, i) => (
              <li key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-gray-100 pb-3">
                <span className="text-xs text-gray-400 shrink-0">{n.date}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded shrink-0">{n.label}</span>
                <span className="text-sm text-gray-700">{n.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

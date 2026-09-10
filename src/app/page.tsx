import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { municipalities } from "@/data/municipalities";
import { regions } from "@/data/regions";
import { benefitCategories } from "@/data/benefitCategories";
import { newsItems } from "@/data/news";
import { sortByDisplayPriority } from "@/data/municipalitySort";
import MunicipalityCard from "@/components/MunicipalityCard";
import CTAButton from "@/components/CTAButton";
import SectionTitle from "@/components/SectionTitle";
import { HomeIntroduction, HomeParticipationSteps, HomeQuestions } from "@/components/HomeGuide";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "デジじゅう-好きなまちとつながる、デジタル住民票紹介サイト",
  description:
    "ふるさと納税以外にも、地域を応援する選択肢。デジタル住民票や地域ファン向け会員証を、地域・特典・価格から比較して、応援したいまちを探せます。法律上の住民票やふるさと納税とは異なります。",
};

const FEATURED = sortByDisplayPriority(municipalities.filter((m) => m.isFeatured)).slice(0, 6);

const COMPARISON_ROWS = [
  { item: "主な目的", digital: "地域との継続的なつながり", furusato: "自治体への寄付" },
  { item: "税控除", digital: "原則なし", furusato: "条件によりあり" },
  { item: "法律上の住民票", digital: "取得できない", furusato: "取得できない" },
  { item: "特典", digital: "自治体・発行元により異なる", furusato: "返礼品がある場合がある" },
  { item: "申込先", digital: "公式ページ・発行元", furusato: "ふるさと納税サイト等" },
];

const popularKeywords = ["デジタル住民票", "観光", "宿泊", "イベント", "NFT"];

export default function HomePage() {
  const siteUrl = getSiteUrl();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "デジじゅう",
            description: "全国のデジタル住民制度を地域・特典・制度タイプから比較できる情報サイト",
            url: siteUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl}/municipalities?keyword={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <section className="relative overflow-hidden border-b border-orange-100">
        <Image
          src="/images/top-rural-landscape.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/20" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="rounded-lg bg-white/85 p-4 shadow-sm backdrop-blur-[1px] md:p-6 lg:pr-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-200">
                  法律上の住民票ではありません
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-200">
                  原則として税控除の対象ではありません
                </span>
              </div>
              <p className="text-sm font-semibold text-orange-700 mb-3">
                ふるさと納税以外にも、地域を応援する選択肢。
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#13233f]">
                デジじゅう
                <span className="mt-3 block text-2xl md:text-4xl">
                  住んでいなくても、
                  <br />好きなまちの力になれる。
                </span>
              </h1>
              <p className="mt-5 text-base md:text-lg font-medium text-[#25324a] leading-relaxed">
                生まれ育ったふるさと、旅で出会ったお気に入りのまち。
                デジタル住民票をきっかけに、地域とつながる応援を始めませんか。
              </p>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                デジじゅうは、全国のデジタル住民票・デジタル住民NFT・地域ファン向け会員証を、
                地域・特典・価格から比較できる情報サイトです。
              </p>
              <div className="mt-5 flex flex-col items-start gap-3">
                <CTAButton href="/municipalities" variant="primary" className="w-full sm:w-auto">
                  応援したいまちを探す
                </CTAButton>
                <Link href="/about" className="text-sm font-semibold text-blue-700 underline underline-offset-4">
                  デジタル住民票について知る
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-white border border-orange-100 px-3 py-3">
                  <p className="text-2xl font-bold text-navy">{municipalities.length}</p>
                  <p className="text-xs text-gray-500">掲載制度</p>
                </div>
                <div className="rounded-lg bg-white border border-orange-100 px-3 py-3">
                  <p className="text-2xl font-bold text-navy">{regions.length}</p>
                  <p className="text-xs text-gray-500">地方区分</p>
                </div>
                <div className="rounded-lg bg-white border border-orange-100 px-3 py-3">
                  <p className="text-2xl font-bold text-navy">{benefitCategories.length}</p>
                  <p className="text-xs text-gray-500">特典カテゴリ</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-orange-100 shadow-sm p-4 md:p-5">
              <h2 className="text-lg font-bold text-navy mb-3">応援したいまちを見つける</h2>
              <form action="/municipalities" className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="top-search" className="sr-only">
                  キーワード検索
                </label>
                <input
                  id="top-search"
                  name="keyword"
                  type="search"
                  placeholder="自治体名・制度名・特典で検索"
                  className="min-h-12 min-w-0 flex-1 rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                  type="submit"
                  className="min-h-12 rounded-lg bg-orange-500 px-6 text-sm font-bold text-white hover:bg-orange-600 transition-colors"
                >
                  検索する
                </button>
              </form>

              <div className="mt-3 flex flex-wrap gap-2">
                {popularKeywords.map((word) => (
                  <Link
                    key={word}
                    href={`/municipalities?keyword=${encodeURIComponent(word)}`}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 hover:border-orange-300 hover:bg-orange-50"
                  >
                    {word}
                  </Link>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { href: "/regions", label: "地域から探す", desc: "地方・都道府県別" },
                  { href: "/benefits", label: "特典から探す", desc: "観光・宿泊・体験" },
                  { href: "/types", label: "タイプから探す", desc: "NFT・会員証など" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg border border-gray-200 p-4 hover:border-orange-300 hover:bg-orange-50 transition-colors"
                  >
                    <p className="font-bold text-navy">{item.label}</p>
                    <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-5 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                まずは地域や気になる特典から探してみましょう。
                参加・購入は各公式サイトで行います。
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeIntroduction />

      <section className="py-12 bg-[#eaf4e7] border-y border-green-200">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="地方から探す" subtitle="ふるさとや旅先など、気になる地域から制度を探してみましょう。" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {regions.map((r) => {
              const count = municipalities.filter((m) => m.region === r.name).length;
              const examples = municipalities
                .filter((m) => m.region === r.name)
                .slice(0, 2)
                .map((m) => m.municipality)
                .join("・");
              return (
                <Link
                  key={r.id}
                  href={`/municipalities?region=${encodeURIComponent(r.name)}`}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-4 hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  <p className="font-bold text-navy">{r.name}</p>
                  <p className="mt-1 text-sm text-orange-600">{count}件</p>
                  {examples && <p className="mt-2 text-xs text-gray-500 line-clamp-1">{examples}</p>}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#fff1dc] border-b border-orange-200">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="特典から探す" subtitle="特典は保証ではありません。利用条件は各公式ページで確認してください。" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {benefitCategories.map((cat) => {
              const count = municipalities.filter((m) => m.benefitCategories.includes(cat.id)).length;
              return (
                <Link
                  key={cat.id}
                  href={`/municipalities?benefit=${cat.id}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{count}件</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#edf3fa] border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            title="注目の制度"
            subtitle="地域との関わり方や特典を見比べてみましょう。受付状況は確認日時点の情報です。"
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

      <HomeParticipationSteps />

      <section className="py-14 bg-[#f0ece4] border-b border-stone-300">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle title="ふるさと納税との違い" subtitle="デジタル住民制度は、寄付制度・税控除制度ではありません。" />
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
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
                  <tr key={row.item} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-gray-700">{row.item}</td>
                    <td className="px-4 py-3 text-gray-700">{row.digital}</td>
                    <td className="px-4 py-3 text-gray-700">{row.furusato}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-5">
            <Link href="/difference" className="text-sm font-semibold text-blue-600 hover:underline">
              詳しい比較を見る →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#f5f1e9]">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle title="新着・更新情報" />
          <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
            {newsItems.slice(0, 3).map((n) => (
              <li key={n.slug} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center">
                <span className="text-xs text-gray-400 shrink-0">{n.publishedAt}</span>
                <span className="w-fit rounded bg-orange-100 px-2 py-0.5 text-xs text-orange-700 shrink-0">{n.category}</span>
                <Link href={`/news/${n.slug}`} className="text-sm text-gray-700 hover:text-blue-700 hover:underline">
                  {n.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 text-center">
            <Link href="/news" className="text-sm font-semibold text-blue-600 hover:underline">
              ニュース一覧を見る →
            </Link>
          </div>
        </div>
      </section>

      <HomeQuestions />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { municipalities } from "@/data/municipalities";
import { regions } from "@/data/regions";
import { benefitCategories } from "@/data/benefitCategories";
import { sortByDisplayPriority } from "@/data/municipalitySort";
import MunicipalityCard from "@/components/MunicipalityCard";
import CTAButton from "@/components/CTAButton";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "デジじゅう｜デジタル住民制度を地域・特典・タイプから探せる比較サイト",
  description:
    "全国のデジタル住民票、デジタル住民NFT、デジタル住民証、地域ファン向け会員証を、地域・特典・価格・制度タイプから比較できる情報サイトです。法律上の住民票やふるさと納税とは異なります。",
};

const FEATURED = sortByDisplayPriority(municipalities.filter((m) => m.isFeatured)).slice(0, 6);

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
  { date: "2026-06-01", label: "お願い", text: "価格・特典・販売状況は変更される場合があります。参加前に必ず公式ページをご確認ください。" },
];

const popularKeywords = ["デジタル住民票", "観光", "宿泊", "イベント", "NFT"];

export default function HomePage() {
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
            url: "https://degi-juu.vercel.app",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://degi-juu.vercel.app/municipalities?keyword={search_term_string}",
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
        <div className="absolute inset-0 bg-white/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/86 to-white/70" />
        <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="rounded-lg bg-white/68 p-4 shadow-sm backdrop-blur-[1px] md:p-6 lg:pr-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-200">
                  法律上の住民票ではありません
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-200">
                  原則として税控除の対象ではありません
                </span>
              </div>
              <p className="text-sm font-semibold text-orange-700 mb-3">
                全国のデジタル住民制度 比較・検索サイト
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#13233f]">
                デジじゅう
                <span className="mt-3 block text-2xl md:text-4xl">
                  地域と特典から、参加したい制度を探す。
                </span>
              </h1>
              <p className="mt-5 text-base md:text-lg font-medium text-[#25324a] leading-relaxed">
                デジタル住民票・デジタル住民NFT・地域ファン向け会員証を、
                自治体・特典・価格・制度タイプから比較できます。
              </p>
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
              <h2 className="text-lg font-bold text-navy mb-3">制度を探す</h2>
              <form action="/municipalities" className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="top-search" className="sr-only">
                  キーワード検索
                </label>
                <input
                  id="top-search"
                  name="keyword"
                  type="search"
                  placeholder="自治体名・制度名・特典で検索"
                  className="min-h-12 flex-1 rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                本サイトは自治体公式サイトではありません。掲載情報は確認日時点の内容です。
                申込・購入・参加条件は必ず公式ページでご確認ください。
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                href: "/regions",
                title: "地域から探す",
                desc: "応援したい地方や都道府県から制度を比較できます。",
                cta: "地域一覧へ",
              },
              {
                href: "/benefits",
                title: "特典から探す",
                desc: "観光優待、宿泊、イベント、コミュニティなどから探せます。",
                cta: "特典カテゴリへ",
              },
              {
                href: "/municipalities",
                title: "一覧で比較する",
                desc: "価格、販売状況、確認日、公式ページをまとめて確認できます。",
                cta: "自治体一覧へ",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-lg border border-gray-200 bg-white p-5 hover:border-orange-300 hover:shadow-sm transition-all"
              >
                <h2 className="text-lg font-bold text-navy">{item.title}</h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                <p className="mt-4 text-sm font-semibold text-orange-600 group-hover:text-orange-700">
                  {item.cta} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#eaf4e7] border-y border-green-200">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="地方から探す" subtitle="ランキングではなく、地域の入口から探しやすく整理しています。" />
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
            subtitle="情報が充実している制度を掲載しています。人気・お得ランキングではありません。"
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

      <section className="py-14 bg-[#edf6ff] border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle title="デジタル住民制度とは？" />
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed">
              地域外に住む人が、デジタル上で自治体や地域とつながり、応援・参加できる仕組みです。
              名称や内容は自治体・発行元によって異なり、デジタル住民票NFT、デジタル住民証、
              地域ファン向け会員証などがあります。
            </p>
            <div className="mt-4 rounded-lg bg-white border border-amber-200 px-4 py-3 text-xs text-amber-900 leading-relaxed">
              重要：デジタル住民票という名称が使われる場合でも、住民基本台帳上の住民票ではありません。
              転入・転出・住民登録・行政サービスの利用資格を意味するものではありません。
            </div>
            <div className="mt-5 text-center">
              <CTAButton href="/about" variant="outline">詳しく解説を読む</CTAButton>
            </div>
          </div>
        </div>
      </section>

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
            {NEWS.map((n) => (
              <li key={`${n.date}-${n.text}`} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center">
                <span className="text-xs text-gray-400 shrink-0">{n.date}</span>
                <span className="w-fit rounded bg-orange-100 px-2 py-0.5 text-xs text-orange-700 shrink-0">{n.label}</span>
                <span className="text-sm text-gray-700">{n.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

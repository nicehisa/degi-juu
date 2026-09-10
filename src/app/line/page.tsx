import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LINE公式アカウント連携｜デジじゅう",
  description:
    "デジじゅうのLINEによる更新情報のご案内です。",
};

export default function LinePage() {
  const lineUrl = process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">LINE連携</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">LINEで更新情報を受け取る</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          気になる地域の制度や新着記事を、LINEで受け取るためのご案内です。
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-navy">友だち追加</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          新しく掲載した制度や、地域との関わり方が分かる記事をご案内します。
        </p>
        {lineUrl ? (
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            LINE公式アカウントを追加する
          </a>
        ) : (
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            LINEでのお知らせは現在準備中です。最新情報はサイト内のニュースをご覧ください。
          </div>
        )}
      </section>

      <div className="mt-6">
        <Link href="/news" className="text-sm font-semibold text-blue-600 hover:underline">
          新着情報を見る
        </Link>
      </div>
    </div>
  );
}

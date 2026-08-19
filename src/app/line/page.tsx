import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LINE公式アカウント連携｜デジじゅう",
  description:
    "デジじゅうのLINE公式アカウント連携ページです。友だち追加導線を設置できます。",
};

export default function LinePage() {
  const lineUrl = process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">LINE連携</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">LINEで更新情報を受け取る</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          LINE公式アカウントの友だち追加導線です。アカウントURLを環境変数に設定すると、
          このページから直接追加できるようになります。
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-navy">友だち追加</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          新しい掲載制度、記事、自治体向けのお知らせなどを届ける導線として利用できます。
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
            `NEXT_PUBLIC_LINE_OFFICIAL_URL` を設定すると、友だち追加ボタンが有効になります。
          </div>
        )}
      </section>

      <div className="mt-6">
        <Link href="/newsletter" className="text-sm font-semibold text-blue-600 hover:underline">
          メールで更新情報を受け取る
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "メールマガジン登録｜デジじゅう",
  description:
    "新しいデジタル住民制度、掲載情報、地域ファン向け制度の更新情報をメールで受け取れます。",
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold text-orange-700">メールマガジン</p>
          <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">新しい制度情報を受け取る</h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            新しいデジタル住民制度、掲載情報の更新、自治体向けのお知らせをメールで受け取れます。
            配信や登録受付の状況は、このページでご案内します。
          </p>
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            本メールは制度への参加を推奨するものではありません。申込前には必ず公式ページで最新情報をご確認ください。
          </div>
        </div>
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL ? <NewsletterForm /> : (
            <div>
              <h2 className="text-lg text-navy">メールでのお知らせは準備中です</h2>
              <p className="mt-3 text-base leading-7 text-gray-700">現在、登録受付を休止しています。新しく掲載した制度や記事は、ニュースページでご覧いただけます。</p>
              <Link href="/news" className="mt-4 inline-flex min-h-11 items-center font-semibold text-blue-700 underline">新着情報を見る →</Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

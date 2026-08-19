import type { Metadata } from "next";
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
            配信開始前の登録受付として運用できます。
          </p>
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            本メールは制度への参加を推奨するものではありません。申込前には必ず公式ページで最新情報をご確認ください。
          </div>
        </div>
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <NewsletterForm />
        </section>
      </div>
    </div>
  );
}

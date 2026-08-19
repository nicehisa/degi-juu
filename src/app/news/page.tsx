import type { Metadata } from "next";
import Link from "next/link";
import { newsItems } from "@/data/news";

export const metadata: Metadata = {
  title: "ニュース｜デジじゅう",
  description: "デジじゅうの更新情報、掲載情報、運営からのお知らせを掲載しています。",
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">ニュース</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">新着・更新情報</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          デジじゅうの更新情報、掲載依頼受付、制度候補の検知状況などをお知らせします。
        </p>
      </div>

      <div className="space-y-4">
        {newsItems.map((item) => (
          <article key={item.slug} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded bg-orange-100 px-2 py-0.5 font-semibold text-orange-700">{item.category}</span>
              <span className="text-gray-500">{item.publishedAt}</span>
            </div>
            <h2 className="mt-3 text-lg font-bold text-navy">
              <Link href={`/news/${item.slug}`} className="hover:text-blue-700">
                {item.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

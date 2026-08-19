import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "記事・コラム｜デジじゅう",
  description:
    "デジタル住民票、デジタル住民NFT、地域ファン制度の基礎知識や選び方を解説します。",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">SEO記事・コラム</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">デジタル住民制度を知る</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          参加前に知っておきたい基礎知識、選び方、注意点をまとめています。
          法律上の住民票やふるさと納税との違いも、誤解がないよう整理します。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {articles.map((article) => (
          <article key={article.slug} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-orange-700">{article.category}</p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-navy">
              <Link href={`/articles/${article.slug}`} className="hover:text-blue-700">
                {article.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{article.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>{article.publishedAt}</span>
              <span>{article.readingMinutes}分で読める</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

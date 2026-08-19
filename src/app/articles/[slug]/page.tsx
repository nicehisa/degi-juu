import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title}｜デジじゅう`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/articles" className="text-sm font-semibold text-blue-600 hover:underline">
        記事一覧へ戻る
      </Link>
      <header className="mt-6 border-b border-gray-200 pb-6">
        <p className="text-sm font-semibold text-orange-700">{article.category}</p>
        <h1 className="mt-2 text-2xl font-bold leading-snug text-navy md:text-3xl">{article.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{article.description}</p>
        <p className="mt-4 text-xs text-gray-500">
          公開日：{article.publishedAt} / 更新日：{article.updatedAt} / {article.readingMinutes}分で読める
        </p>
      </header>

      <div className="mt-8 space-y-5 text-sm leading-8 text-gray-700">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-base font-bold text-amber-900">参加前の注意</h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-900">
          デジタル住民票等は法律上の住民票・住民登録・ふるさと納税とは異なります。
          申込前には必ず公式ページで最新情報をご確認ください。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-navy">関連リンク</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {article.relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 hover:border-blue-300 hover:bg-blue-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

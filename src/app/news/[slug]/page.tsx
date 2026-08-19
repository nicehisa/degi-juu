import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsItem, newsItems } from "@/data/news";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) return {};
  return {
    title: `${item.title}｜デジじゅう`,
    description: item.summary,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/news" className="text-sm font-semibold text-blue-600 hover:underline">
        ニュース一覧へ戻る
      </Link>
      <header className="mt-6 border-b border-gray-200 pb-6">
        <p className="text-sm font-semibold text-orange-700">{item.category}</p>
        <h1 className="mt-2 text-2xl font-bold leading-snug text-navy md:text-3xl">{item.title}</h1>
        <p className="mt-3 text-sm text-gray-500">公開日：{item.publishedAt}</p>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">{item.summary}</p>
      </header>
      <div className="mt-8 space-y-5 text-sm leading-8 text-gray-700">
        {item.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

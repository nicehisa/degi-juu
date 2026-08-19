import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { benefitCategories } from "@/data/benefitCategories";
import { municipalities } from "@/data/municipalities";
import { sortByDisplayPriority } from "@/data/municipalitySort";
import MunicipalityCard from "@/components/MunicipalityCard";
import LegalNoticeBox from "@/components/LegalNoticeBox";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return benefitCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = benefitCategories.find((item) => item.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name}があるデジタル住民票・デジタル住民制度｜デジじゅう`,
    description: `${category.name}に関連するデジタル住民票、デジタル住民NFT、地域ファン向け会員証を探せます。`,
  };
}

export default async function BenefitDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = benefitCategories.find((item) => item.slug === slug);
  if (!category) notFound();

  const matched = sortByDisplayPriority(
    municipalities.filter((municipality) => municipality.benefitCategories.includes(category.id))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">トップ</Link>
        <span>/</span>
        <Link href="/benefits" className="hover:text-blue-600">特典から探す</Link>
        <span>/</span>
        <span className="text-gray-700">{category.name}</span>
      </nav>

      <div className="mb-6">
        <p className="text-sm font-semibold text-orange-700">特典別SEOページ</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">
          {category.name}があるデジタル住民票・デジタル住民制度
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{category.description}</p>
      </div>

      <div className="mb-6">
        <LegalNoticeBox text="特典は必ず保証されるものではありません。利用条件、対象者、期間は自治体・発行元により異なります。最新情報は必ず公式ページをご確認ください。" />
      </div>

      {matched.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matched.map((municipality) => (
            <MunicipalityCard key={municipality.id} municipality={municipality} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          現在、この特典カテゴリで掲載中の制度はありません。
        </div>
      )}
    </div>
  );
}

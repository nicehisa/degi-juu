import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { regions } from "@/data/regions";
import { municipalities } from "@/data/municipalities";
import MunicipalityCard from "@/components/MunicipalityCard";
import LegalNoticeBox from "@/components/LegalNoticeBox";
import { sortByDisplayPriority } from "@/data/municipalitySort";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const region = regions.find((item) => item.slug === slug);
  if (!region) return {};

  return {
    title: `${region.name}のデジタル住民票・デジタル住民制度｜デジじゅう`,
    description: `${region.name}エリアのデジタル住民票、デジタル住民NFT、地域ファン向け会員証を一覧で確認できます。`,
  };
}

export default async function RegionDetailPage({ params }: Props) {
  const { slug } = await params;
  const region = regions.find((item) => item.slug === slug);
  if (!region) notFound();

  const matched = sortByDisplayPriority(
    municipalities.filter((municipality) => municipality.region === region.name)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">トップ</Link>
        <span>/</span>
        <Link href="/regions" className="hover:text-blue-600">地域から探す</Link>
        <span>/</span>
        <span className="text-gray-700">{region.name}</span>
      </nav>

      <div className="mb-6">
        <p className="text-sm font-semibold text-orange-700">地域別SEOページ</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">
          {region.name}のデジタル住民票・デジタル住民制度
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{region.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {region.prefectures.map((prefecture) => (
            <Link
              key={prefecture}
              href={`/prefectures/${encodeURIComponent(prefecture)}`}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:border-orange-300 hover:bg-orange-50"
            >
              {prefecture}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <LegalNoticeBox />
      </div>

      {matched.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matched.map((municipality) => (
            <MunicipalityCard key={municipality.id} municipality={municipality} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          現在、この地域で掲載中の制度はありません。
        </div>
      )}
    </div>
  );
}

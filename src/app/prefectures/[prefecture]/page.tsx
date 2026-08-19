import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { municipalities } from "@/data/municipalities";
import { regions } from "@/data/regions";
import { sortByDisplayPriority } from "@/data/municipalitySort";
import MunicipalityCard from "@/components/MunicipalityCard";
import LegalNoticeBox from "@/components/LegalNoticeBox";

type Props = { params: Promise<{ prefecture: string }> };

const prefectures = [...new Set(regions.flatMap((region) => region.prefectures))];

export async function generateStaticParams() {
  return prefectures.map((prefecture) => ({ prefecture }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { prefecture } = await params;
  const decoded = decodeURIComponent(prefecture);
  if (!prefectures.includes(decoded)) return {};

  return {
    title: `${decoded}のデジタル住民票・デジタル住民制度｜デジじゅう`,
    description: `${decoded}のデジタル住民票、デジタル住民NFT、地域ファン向け会員証を一覧で確認できます。`,
  };
}

export default async function PrefecturePage({ params }: Props) {
  const { prefecture } = await params;
  const decoded = decodeURIComponent(prefecture);
  if (!prefectures.includes(decoded)) notFound();

  const matched = sortByDisplayPriority(
    municipalities.filter((municipality) => municipality.prefecture === decoded)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">トップ</Link>
        <span>/</span>
        <Link href="/regions" className="hover:text-blue-600">地域から探す</Link>
        <span>/</span>
        <span className="text-gray-700">{decoded}</span>
      </nav>

      <div className="mb-6">
        <p className="text-sm font-semibold text-orange-700">都道府県別SEOページ</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">
          {decoded}のデジタル住民票・デジタル住民制度
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {decoded}内の自治体が実施するデジタル住民制度を確認できます。掲載情報は確認日時点の内容です。
        </p>
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
          現在、この都道府県で掲載中の制度はありません。
        </div>
      )}
    </div>
  );
}

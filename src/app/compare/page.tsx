import type { Metadata } from "next";
import Link from "next/link";
import { municipalities } from "@/data/municipalities";
import { partitionMunicipalities } from "@/data/municipalityVisibility";
import CompareTable from "@/components/CompareTable";
import LegalNoticeBox from "@/components/LegalNoticeBox";
import CommonNotice from "@/components/CommonNotice";
import { getComparisonSelection } from "@/lib/comparisonSelection";

type Props = { searchParams: Promise<{ ids?: string | string[] }> };

const baseMetadata: Metadata = {
  title: "デジタル住民制度を比較｜デジじゅう",
  description:
    "デジタル住民票、デジタル住民NFT、デジタル住民証を価格・特典・種別ごとに比較できます。",
  alternates: { canonical: "/compare" },
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { ids } = await searchParams;
  return { ...baseMetadata, ...(ids !== undefined ? { robots: { index: false, follow: true } } : {}) };
}

export default async function ComparePage({ searchParams }: Props) {
  const { ids } = await searchParams;
  const selection = getComparisonSelection(municipalities, ids);
  const { current, archived } = partitionMunicipalities(selection.ordered);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">
          デジタル住民制度を比較する
        </h1>
        <p className="text-gray-600 text-sm">
          受付終了を除く{current.length}自治体の制度を横並びで比較できます。
          横スクロールでご確認ください。
        </p>
      </div>

      {selection.hasUnknownIds && <p role="status" className="mb-5 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
        {selection.selected.length > 0 ? "指定された制度の一部が見つかりませんでした。見つかった制度を比較対象として選択しています。" : "指定された制度が見つかりませんでした。受付終了以外の掲載制度を表示しています。"}
      </p>}
      {selection.selected.length > 0 && <section aria-labelledby="comparison-selection-title" className="mb-6 border-l-4 border-blue-600 bg-blue-50 px-4 py-4">
        <h2 id="comparison-selection-title" className="text-base text-navy">選択中の制度（{selection.selected.length}件）</h2>
        <ul className="mt-2 space-y-2 text-sm leading-7">
          {selection.selected.map(item => <li key={item.slug}>
            <Link href={`/municipalities/${item.slug}`} className="font-semibold text-blue-800 underline underline-offset-4">{item.municipality}：{item.programName}</Link>
            {item.status === "終了" && <span className="ml-2 text-amber-900">受付終了・募集時の情報</span>}
          </li>)}
        </ul>
        <Link href="/compare" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 underline underline-offset-4">選択を解除</Link>
      </section>}

      <div className="mb-4 space-y-3">
        <CommonNotice />
        <LegalNoticeBox />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <CompareTable municipalities={current} selectedSlugs={selection.selectedSlugs} />
      </div>

      {archived.length > 0 && <details open={archived.some(item => selection.selectedSlugs.includes(item.slug))} className="mt-10 border-t border-gray-200 pt-4">
        <summary className="cursor-pointer py-3 font-semibold text-blue-700">過去に実施した自治体を見る（{archived.length}件）</summary>
        <p className="mb-4 text-sm text-gray-600">以下は掲載している募集が終了した制度です。</p>
        <CompareTable municipalities={archived} selectedSlugs={selection.selectedSlugs} />
      </details>}

      <p className="text-xs text-gray-400 mt-4 text-center">
        ※ 掲載情報は確認日時点の内容です。最新情報は各公式ページをご確認ください。
        本サイトは自治体公式サイトではありません。
      </p>
    </div>
  );
}

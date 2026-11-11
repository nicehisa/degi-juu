import type { Metadata } from "next";
import { municipalities } from "@/data/municipalities";
import { partitionMunicipalities } from "@/data/municipalityVisibility";
import CompareTable from "@/components/CompareTable";
import LegalNoticeBox from "@/components/LegalNoticeBox";
import CommonNotice from "@/components/CommonNotice";

export const metadata: Metadata = {
  title: "デジタル住民制度を比較｜デジじゅう",
  description:
    "デジタル住民票、デジタル住民NFT、デジタル住民証を価格・特典・種別ごとに比較できます。",
};

export default function ComparePage() {
  const { current, archived } = partitionMunicipalities(municipalities);
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

      <div className="mb-4 space-y-3">
        <CommonNotice />
        <LegalNoticeBox />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <CompareTable municipalities={current} />
      </div>

      {archived.length > 0 && <details className="mt-10 border-t border-gray-200 pt-4">
        <summary className="cursor-pointer py-3 font-semibold text-blue-700">過去に実施した自治体を見る（{archived.length}件）</summary>
        <p className="mb-4 text-sm text-gray-600">以下は掲載している募集が終了した制度です。</p>
        <CompareTable municipalities={archived} />
      </details>}

      <p className="text-xs text-gray-400 mt-4 text-center">
        ※ 掲載情報は確認日時点の内容です。最新情報は各公式ページをご確認ください。
        本サイトは自治体公式サイトではありません。
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import { municipalities } from "@/data/municipalities";
import CompareTable from "@/components/CompareTable";
import LegalNoticeBox from "@/components/LegalNoticeBox";
import CommonNotice from "@/components/CommonNotice";

export const metadata: Metadata = {
  title: "デジタル住民制度を比較｜デジじゅう",
  description:
    "デジタル住民票、デジタル住民NFT、デジタル住民証を価格・特典・種別ごとに比較できます。",
};

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">
          デジタル住民制度を比較する
        </h1>
        <p className="text-gray-600 text-sm">
          全国{municipalities.length}自治体の制度を横並びで比較できます。
          横スクロールでご確認ください。
        </p>
      </div>

      <div className="mb-4 space-y-3">
        <CommonNotice />
        <LegalNoticeBox />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <CompareTable municipalities={municipalities} />
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        ※ 掲載情報は確認日時点の内容です。最新情報は各公式ページをご確認ください。
        本サイトは自治体公式サイトではありません。
      </p>
    </div>
  );
}

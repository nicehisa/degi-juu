import type { Metadata } from "next";
import { Suspense } from "react";
import MunicipalitiesClient from "./MunicipalitiesClient";
import LegalNoticeBox from "@/components/LegalNoticeBox";
import CommonNotice from "@/components/CommonNotice";

export const metadata: Metadata = {
  title: "自治体一覧｜デジじゅう",
  description:
    "全国のデジタル住民制度を、自治体、地域、特典、価格、販売状況から比較できます。",
};

export default function MunicipalitiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">自治体一覧</h1>
        <p className="text-gray-600 text-sm">
          全国のデジタル住民制度を一覧で確認できます。地方・特典カテゴリ・制度タイプで絞り込めます。
        </p>
      </div>

      <div className="mb-4 space-y-3">
        <CommonNotice />
        <LegalNoticeBox />
      </div>

      <Suspense fallback={<div className="text-center py-12 text-gray-400">読み込み中...</div>}>
        <MunicipalitiesClient />
      </Suspense>
    </div>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import MunicipalitiesClient from "./MunicipalitiesClient";
import LegalNoticeBox from "@/components/LegalNoticeBox";
import CommonNotice from "@/components/CommonNotice";
import PromotionSlot from "@/components/PromotionSlot";
import { getActivePromotions } from "@/data/promotions";

export const metadata: Metadata = {
  title: "自治体一覧｜デジじゅう",
  description:
    "全国のデジタル住民制度を、自治体、地域、特典、価格、販売状況から比較できます。",
};

export default function MunicipalitiesPage() {
  const promotions = getActivePromotions("municipalities");

  return (
    <div>
      <section className="bg-[#f7f3eb] border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-sm font-semibold text-orange-600 mb-2">比較・検索</p>
          <h1 className="text-2xl md:text-4xl font-bold text-navy mb-3">自治体一覧</h1>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl">
            全国のデジタル住民制度を一覧で確認できます。地域・特典カテゴリ・制度タイプ・価格帯で絞り込み、
            最終的な申込条件は公式ページで確認してください。
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-4 space-y-3">
          <CommonNotice />
          <LegalNoticeBox />
          {promotions.map((promotion) => (
            <PromotionSlot key={promotion.id} promotion={promotion} />
          ))}
        </div>

        <Suspense fallback={<div className="text-center py-12 text-gray-400">読み込み中...</div>}>
          <MunicipalitiesClient />
        </Suspense>
      </div>
    </div>
  );
}

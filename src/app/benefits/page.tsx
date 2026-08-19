import type { Metadata } from "next";
import Link from "next/link";
import { benefitCategories } from "@/data/benefitCategories";
import { municipalities } from "@/data/municipalities";
import CommonNotice from "@/components/CommonNotice";
import LegalNoticeBox from "@/components/LegalNoticeBox";

export const metadata: Metadata = {
  title: "特典から探す｜デジじゅう",
  description:
    "観光、宿泊、飲食、イベント、限定コミュニティなど、特典カテゴリからデジタル住民制度を探せます。",
};

export default function BenefitsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">特典から探す</h1>
        <p className="text-gray-600 text-sm">
          得られる特典や参加体験のカテゴリからデジタル住民制度を探せます。
        </p>
      </div>

      <div className="mb-6 space-y-3">
        <CommonNotice />
        <LegalNoticeBox text="特典は必ず保証されるものではありません。自治体・発行元の条件、販売状況、保有条件、利用期間により内容は異なります。最新情報は必ず公式ページをご確認ください。" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefitCategories.map((cat) => {
          const matched = municipalities.filter((m) =>
            m.benefitCategories.includes(cat.id)
          );
          const samples = matched.slice(0, 2).map((m) => m.municipality);

          return (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.icon}</span>
                  <h2 className="font-bold text-gray-800 text-base">{cat.name}</h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{cat.description}</p>

                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-xs text-gray-500">該当制度数</span>
                    <p className="font-bold text-blue-700 text-xl">
                      {matched.length}<span className="text-xs font-normal text-gray-500 ml-1">件</span>
                    </p>
                  </div>
                </div>

                {samples.length > 0 && (
                  <p className="text-xs text-gray-500">
                    例：{samples.join("、")}{matched.length > 2 ? "など" : ""}
                  </p>
                )}

                <div className="mt-auto">
                  {matched.length > 0 ? (
                    <Link
                      href={`/benefits/${cat.slug}`}
                      className="block w-full text-center text-sm font-semibold bg-blue-600 text-white rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors"
                    >
                      この特典で探す
                    </Link>
                  ) : (
                    <p className="text-center text-xs text-gray-400 py-2">
                      現在掲載中の制度はありません
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900">
        <strong>特典についての重要な注意：</strong>
        掲載している特典情報は、各自治体・発行元が公表している内容をもとに整理したものです。
        特典の内容・利用条件・有効期限・対象者等は変更される場合があります。
        必ず公式ページでご確認の上、制度をご検討ください。
      </div>
    </div>
  );
}

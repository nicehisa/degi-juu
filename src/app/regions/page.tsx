import type { Metadata } from "next";
import Link from "next/link";
import { regions } from "@/data/regions";
import { municipalities } from "@/data/municipalities";
import CommonNotice from "@/components/CommonNotice";

export const metadata: Metadata = {
  title: "地域から探す｜デジじゅう",
  description:
    "全国のデジタル住民制度を、地方・都道府県・自治体から探せます。",
};

export default function RegionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">地域から探す</h1>
        <p className="text-gray-600 text-sm">
          地方・都道府県からデジタル住民制度を探せます。
        </p>
      </div>

      <div className="mb-6">
        <CommonNotice />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {regions.map((region) => {
          const count = municipalities.filter((m) => m.region === region.name).length;
          const samples = municipalities
            .filter((m) => m.region === region.name)
            .slice(0, 3)
            .map((m) => m.municipality);

          return (
            <div
              key={region.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3">
                <h2 className="text-white font-bold text-lg">{region.name}</h2>
                <p className="text-blue-100 text-xs mt-0.5">{region.prefectures.join("・")}</p>
              </div>
              <div className="p-4 flex flex-col flex-1 gap-3">
                <p className="text-sm text-gray-600 leading-relaxed">{region.description}</p>

                <div>
                  <p className="text-xs text-gray-500 mb-1">掲載制度数</p>
                  <p className="text-2xl font-bold text-blue-700">{count}<span className="text-sm font-normal text-gray-500 ml-1">件</span></p>
                </div>

                {samples.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">掲載中の自治体（例）</p>
                    <p className="text-xs text-gray-700">{samples.join("、")}{count > 3 ? "など" : ""}</p>
                  </div>
                )}

                <div className="mt-auto">
                  {count > 0 ? (
                    <Link
                      href={`/municipalities?region=${encodeURIComponent(region.name)}`}
                      className="block w-full text-center text-sm font-semibold bg-blue-600 text-white rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors"
                    >
                      この地域を見る
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
    </div>
  );
}

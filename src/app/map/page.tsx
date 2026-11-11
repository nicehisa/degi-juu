import type { Metadata } from "next";
import Link from "next/link";
import { municipalities } from "@/data/municipalities";
import { isCurrentMunicipality } from "@/data/municipalityVisibility";
import { regions } from "@/data/regions";

export const metadata: Metadata = {
  title: "都道府県マップから探す｜デジじゅう",
  description:
    "全国のデジタル住民制度を都道府県マップ形式で探せます。地域別・都道府県別ページへの導線をまとめています。",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">地図検索</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">都道府県マップから探す</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          地方ごとに、受付終了を除く掲載制度の件数を表示しています。過去に実施した制度も都道府県のページから確認できます。
        </p>
      </div>

      <div className="space-y-6">
        {regions.map((region) => (
          <section key={region.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-navy">{region.name}</h2>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{region.description}</p>
              </div>
              <Link href={`/regions/${region.slug}`} className="text-sm font-semibold text-blue-600 hover:underline">
                地方ページへ
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {region.prefectures.map((prefecture) => {
                const inPrefecture = municipalities.filter(item => item.prefecture === prefecture);
                const count = inPrefecture.filter(isCurrentMunicipality).length;
                const archivedCount = inPrefecture.length - count;
                return (
                  <Link
                    key={prefecture}
                    href={`/prefectures/${encodeURIComponent(prefecture)}`}
                    className={`rounded-lg border px-3 py-3 text-sm transition-colors ${
                      count > 0
                        ? "border-orange-200 bg-orange-50 text-orange-900 hover:border-orange-400"
                        : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <span className="font-semibold">{prefecture}</span>
                    <span className="mt-1 block text-xs">{count}件{archivedCount > 0 ? `（過去${archivedCount}件）` : ""}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

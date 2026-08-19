import type { Metadata } from "next";
import Link from "next/link";
import MunicipalityCard from "@/components/MunicipalityCard";
import { municipalities } from "@/data/municipalities";

export const metadata: Metadata = {
  title: "掲載情報が確認しやすい制度一覧｜デジじゅう",
  description:
    "デジじゅうで掲載している制度を、公式ページの確認しやすさや情報量をもとに整理しています。人気・おすすめランキングではありません。",
};

function score(item: (typeof municipalities)[number]) {
  return [
    item.officialUrl ? 3 : 0,
    item.imageUrl ? 2 : 0,
    item.benefits.length >= 2 ? 2 : 0,
    item.price !== "要確認" ? 1 : 0,
    item.status === "販売中" || item.status === "受付中" ? 1 : 0,
    item.type === "デジタル住民票" ? 2 : 0,
    item.type.includes("NFT") ? -1 : 0,
  ].reduce((sum, value) => sum + value, 0);
}

const ranked = [...municipalities].sort((a, b) => score(b) - score(a));

export default function RankingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">比較しやすい制度</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">掲載情報が確認しやすい制度一覧</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          人気・お得・おすすめの順位ではありません。公式ページ、画像、特典情報、販売状況など、
          比較時に確認しやすい情報が揃っている制度から表示しています。
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
        本ページは投資性、値上がり期待、税控除、特典の確実性を示すものではありません。
        参加前には必ず各制度の公式ページをご確認ください。
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map((item, index) => (
          <div key={item.id} className="relative">
            <span className="absolute left-3 top-3 z-10 rounded bg-white/95 px-2 py-1 text-xs font-bold text-navy shadow-sm">
              確認しやすさ {index + 1}
            </span>
            <MunicipalityCard municipality={item} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/editorial-policy" className="text-sm font-semibold text-blue-600 hover:underline">
          掲載基準・編集方針を見る
        </Link>
      </div>
    </div>
  );
}

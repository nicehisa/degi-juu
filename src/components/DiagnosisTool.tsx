"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { municipalities } from "@/data/municipalities";
import { sortByDisplayPriority } from "@/data/municipalitySort";

const regionOptions = ["指定なし", "北海道", "東北", "関東", "中部", "近畿", "中国", "四国", "九州・沖縄"];
const benefitOptions = [
  { label: "観光・施設優待", value: "tourism" },
  { label: "宿泊・旅行", value: "stay" },
  { label: "飲食・特産品", value: "food" },
  { label: "イベント参加", value: "event" },
  { label: "コミュニティ", value: "community" },
  { label: "地域情報", value: "info" },
];

export default function DiagnosisTool() {
  const [region, setRegion] = useState("指定なし");
  const [benefit, setBenefit] = useState("tourism");
  const [avoidNft, setAvoidNft] = useState(false);
  const [lowPrice, setLowPrice] = useState(false);

  const results = useMemo(() => {
    return sortByDisplayPriority([...municipalities])
      .map((item) => {
        const points = [
          region === "指定なし" || item.region === region ? 3 : 0,
          item.benefitCategories.includes(benefit) ? 4 : 0,
          avoidNft && item.type.includes("NFT") ? -3 : 0,
          avoidNft && !item.type.includes("NFT") ? 2 : 0,
          lowPrice && typeof item.priceNumber === "number" && item.priceNumber <= 3000 ? 2 : 0,
          item.status === "販売中" || item.status === "受付中" ? 1 : 0,
          item.officialUrl ? 1 : 0,
        ].reduce((sum, value) => sum + value, 0);

        return { item, points };
      })
      .filter(({ points }) => points > 0)
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);
  }, [avoidNft, benefit, lowPrice, region]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-navy">条件を選ぶ</h2>
        <div className="mt-5 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">気になる地域</span>
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {regionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-700">重視したい特典・関わり方</span>
            <select
              value={benefit}
              onChange={(event) => setBenefit(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {benefitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={avoidNft}
              onChange={(event) => setAvoidNft(event.target.checked)}
              className="mt-1"
            />
            <span>NFTの知識がなくても参加しやすい制度を優先する</span>
          </label>

          <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={lowPrice}
              onChange={(event) => setLowPrice(event.target.checked)}
              className="mt-1"
            />
            <span>低めの参加費用から確認したい</span>
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-navy">診断結果</h2>
        <p className="mt-2 text-xs leading-relaxed text-gray-500">
          条件に近い制度を表示しています。おすすめ順位や特典の確実性を示すものではありません。
        </p>
        <div className="mt-5 space-y-3">
          {results.map(({ item, points }) => (
            <article key={item.id} className="rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  適合度 {points}
                </span>
                <span className="text-xs text-gray-500">{item.prefecture}</span>
              </div>
              <h3 className="mt-2 font-bold text-navy">{item.municipality}</h3>
              <p className="mt-1 text-sm font-semibold text-gray-700">{item.programName}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">{item.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={`/municipalities/${item.slug}`}
                  className="rounded-md border border-blue-300 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                >
                  詳細を見る
                </Link>
                <a
                  href={item.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
                >
                  公式で確認
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

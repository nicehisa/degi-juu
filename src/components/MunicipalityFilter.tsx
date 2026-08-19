"use client";

import { MunicipalityStatus, MunicipalityType } from "@/data/municipalities";
import { regions } from "@/data/regions";
import { benefitCategories } from "@/data/benefitCategories";

export type FilterState = {
  region: string;
  prefecture: string;
  type: string;
  status: string;
  benefit: string;
  priceRange: string;
  keyword: string;
  sortBy: string;
};

type Props = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  prefectures: string[];
};

const TYPES: MunicipalityType[] = [
  "デジタル住民票",
  "デジタル住民票NFT",
  "デジタル住民NFT",
  "デジタル住民証",
  "デジタル会員証",
  "アプリ型",
  "その他",
];

const STATUSES: MunicipalityStatus[] = ["販売中", "受付中", "終了", "要確認"];

const SORT_OPTIONS = [
  { value: "default", label: "新着順" },
  { value: "updated", label: "情報更新順" },
  { value: "priceAsc", label: "価格が安い順" },
  { value: "priceDesc", label: "価格が高い順" },
  { value: "name", label: "自治体名順" },
];

const PRICE_RANGES = [
  { value: "free", label: "無料・0円" },
  { value: "under1000", label: "1,000円未満" },
  { value: "1000-4999", label: "1,000円〜4,999円" },
  { value: "5000-9999", label: "5,000円〜9,999円" },
  { value: "10000-", label: "10,000円以上" },
  { value: "unknown", label: "要確認" },
];

export const DEFAULT_FILTERS: FilterState = {
  region: "",
  prefecture: "",
  type: "",
  status: "",
  benefit: "",
  priceRange: "",
  keyword: "",
  sortBy: "default",
};

export default function MunicipalityFilter({ filters, onChange, prefectures }: Props) {
  const update = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value });

  const activeCount = [
    filters.keyword, filters.region, filters.prefecture,
    filters.type, filters.status, filters.benefit, filters.priceRange,
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-800 text-sm">絞り込み・並び替え</h2>
        {activeCount > 0 && (
          <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">
            {activeCount}件適用中
          </span>
        )}
      </div>

      {/* Keyword */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">キーワード検索</label>
        <input
          type="text"
          value={filters.keyword}
          onChange={(e) => update("keyword", e.target.value)}
          placeholder="自治体名・制度名・都道府県..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Region */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">地方</label>
        <select
          value={filters.region}
          onChange={(e) => update("region", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">すべての地方</option>
          {regions.map((r) => (
            <option key={r.id} value={r.name}>{r.name}</option>
          ))}
        </select>
      </div>

      {/* Prefecture */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">都道府県</label>
        <select
          value={filters.prefecture}
          onChange={(e) => update("prefecture", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">すべての都道府県</option>
          {prefectures.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Benefit Category */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">特典カテゴリ</label>
        <select
          value={filters.benefit}
          onChange={(e) => update("benefit", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">すべての特典</option>
          {benefitCategories.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">制度タイプ</label>
        <select
          value={filters.type}
          onChange={(e) => update("type", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">すべてのタイプ</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">販売状況</label>
        <select
          value={filters.status}
          onChange={(e) => update("status", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">すべての状況</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">価格帯</label>
        <select
          value={filters.priceRange}
          onChange={(e) => update("priceRange", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">すべての価格帯</option>
          {PRICE_RANGES.map((range) => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">並び替え</label>
        <select
          value={filters.sortBy}
          onChange={(e) => update("sortBy", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={() => onChange(DEFAULT_FILTERS)}
        className="w-full text-xs text-gray-500 hover:text-gray-700 underline pt-1"
      >
        絞り込みをリセット
      </button>
    </div>
  );
}

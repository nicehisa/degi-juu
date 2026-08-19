"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { municipalities } from "@/data/municipalities";
import { benefitCategories } from "@/data/benefitCategories";
import { sortByDisplayPriority } from "@/data/municipalitySort";
import MunicipalityCard from "@/components/MunicipalityCard";
import MunicipalityFilter, { FilterState, DEFAULT_FILTERS } from "@/components/MunicipalityFilter";

const PREFECTURES = Array.from(
  new Set(municipalities.map((m) => m.prefecture))
).sort();

export default function MunicipalitiesClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    region: searchParams.get("region") ?? "",
    type: searchParams.get("type") ?? "",
    benefit: searchParams.get("benefit") ?? "",
    keyword: searchParams.get("keyword") ?? "",
    priceRange: searchParams.get("priceRange") ?? "",
  });

  // Sync URL params on mount
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      region: searchParams.get("region") ?? prev.region,
      type: searchParams.get("type") ?? prev.type,
      benefit: searchParams.get("benefit") ?? prev.benefit,
      keyword: searchParams.get("keyword") ?? prev.keyword,
      priceRange: searchParams.get("priceRange") ?? prev.priceRange,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let result = [...municipalities];

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(
        (m) => {
          const benefitNames = benefitCategories
            .filter((category) => m.benefitCategories.includes(category.id))
            .map((category) => category.name)
            .join(" ");
          const searchableText = [
            m.municipality,
            m.programName,
            m.prefecture,
            m.region,
            m.summary,
            m.target,
            m.benefits.join(" "),
            benefitNames,
          ].join(" ").toLowerCase();
          return searchableText.includes(kw);
        }
      );
    }
    if (filters.region) result = result.filter((m) => m.region === filters.region);
    if (filters.prefecture) result = result.filter((m) => m.prefecture === filters.prefecture);
    if (filters.type) result = result.filter((m) => m.type === filters.type);
    if (filters.status) result = result.filter((m) => m.status === filters.status);
    if (filters.benefit) result = result.filter((m) => m.benefitCategories.includes(filters.benefit));
    if (filters.priceRange) {
      result = result.filter((m) => {
        const price = m.priceNumber;
        if (filters.priceRange === "unknown") return price == null;
        if (price == null) return false;
        if (filters.priceRange === "free") return price === 0;
        if (filters.priceRange === "under1000") return price > 0 && price < 1000;
        if (filters.priceRange === "1000-4999") return price >= 1000 && price <= 4999;
        if (filters.priceRange === "5000-9999") return price >= 5000 && price <= 9999;
        if (filters.priceRange === "10000-") return price >= 10000;
        return true;
      });
    }

    if (filters.sortBy === "name") {
      result.sort((a, b) => a.municipality.localeCompare(b.municipality, "ja"));
    } else if (filters.sortBy === "priceAsc") {
      result.sort((a, b) => (a.priceNumber ?? 99999) - (b.priceNumber ?? 99999));
    } else if (filters.sortBy === "priceDesc") {
      result.sort((a, b) => (b.priceNumber ?? 0) - (a.priceNumber ?? 0));
    } else if (filters.sortBy === "updated") {
      result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    } else {
      result = sortByDisplayPriority(result);
    }

    return result;
  }, [filters]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="lg:w-64 shrink-0">
        <MunicipalityFilter
          filters={filters}
          onChange={setFilters}
          prefectures={PREFECTURES}
        />
      </aside>

      <div className="flex-1">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            {filtered.length}件の制度が見つかりました
          </p>
          <p className="text-xs text-gray-500">
            申込前に価格・条件・特典を公式ページで確認してください。
          </p>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p>条件に一致する制度が見つかりませんでした。</p>
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="mt-4 text-sm text-blue-600 underline"
            >
              絞り込みをリセット
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((m) => (
              <MunicipalityCard key={m.id} municipality={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

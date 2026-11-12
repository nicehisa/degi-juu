"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { municipalities } from "@/data/municipalities";
import { benefitCategories } from "@/data/benefitCategories";
import { sortByDisplayPriority } from "@/data/municipalitySort";
import MunicipalityResults from "@/components/MunicipalityResults";
import { partitionMunicipalities } from "@/data/municipalityVisibility";
import MunicipalityFilter, { FilterState, DEFAULT_FILTERS } from "@/components/MunicipalityFilter";

const PREFECTURES = Array.from(
  new Set(municipalities.map((m) => m.prefecture))
).sort();

export default function MunicipalitiesClient() {
  const searchParams = useSearchParams();
  const initialFilters = Object.fromEntries(
    Object.entries(DEFAULT_FILTERS).map(([key, value]) => [key, searchParams.get(key) ?? value])
  ) as FilterState;
  return <FilteredMunicipalities key={searchParams.toString()} initialFilters={initialFilters} />;
}

function FilteredMunicipalities({ initialFilters }: { initialFilters: FilterState }) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const matching = useMemo(() => {
    let result = [...municipalities];

    if (filters.keyword) {
      const kw = filters.keyword.trim().toLowerCase();
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

  const filtered = filters.status ? matching.filter(m => m.status === filters.status) : matching;
  const { current, archived } = partitionMunicipalities(filtered);
  const archivedOnly = filters.status === "終了";
  const matchingArchive = partitionMunicipalities(matching).archived;
  const showArchiveFallback = !archivedOnly && current.length === 0 && matchingArchive.length > 0;
  const displayed = showArchiveFallback ? matchingArchive : filtered;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="lg:w-64 shrink-0">
        <MunicipalityFilter
          filters={filters}
          onChange={setFilters}
          prefectures={PREFECTURES}
        />
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            {archivedOnly ? `過去に実施した制度 ${archived.length}件` : showArchiveFallback ? `過去に実施した制度 ${matchingArchive.length}件を表示` : `${current.length}件の制度を表示（受付終了を除く）`}
          </p>
          <p className="text-xs text-gray-500">
            価格帯は掲載された基本・最低費用が目安です。追加費用などは公式ページで確認してください。
          </p>
        </div>
        {displayed.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p>条件に一致する制度が見つかりませんでした。</p>
            <p className="mt-2 text-sm text-gray-600">地域や特典の条件を変えて、ほかの制度も探してみてください。</p>
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="mt-4 text-sm text-blue-600 underline"
            >
              絞り込みをリセット
            </button>
          </div>
        ) : (
          <MunicipalityResults municipalities={displayed} archivedOnly={archivedOnly} />
        )}
      </div>
    </div>
  );
}

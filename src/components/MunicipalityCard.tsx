import Link from "next/link";
import Image from "next/image";
import { Municipality } from "@/data/municipalities";
import { benefitCategories } from "@/data/benefitCategories";
import { StatusBadge, TypeBadge } from "./Badge";

type Props = {
  municipality: Municipality;
};

export default function MunicipalityCard({ municipality: m }: Props) {
  const benefitCats = benefitCategories.filter((c) =>
    m.benefitCategories.includes(c.id)
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:border-orange-300 hover:shadow-md transition-all flex flex-col overflow-hidden">
      <Link href={`/municipalities/${m.slug}`} className="block">
        <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
          {m.imageUrl ? (
            <Image
              src={m.imageUrl}
              alt={`${m.municipality}のイメージ`}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#f7f3eb] text-sm font-semibold text-orange-700">
              {m.municipality}
            </div>
          )}
          <div className="absolute left-3 top-3">
            <StatusBadge status={m.status} />
          </div>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs font-semibold text-orange-700">{m.prefecture}・{m.region}</p>
          <h3 className="mt-1 text-lg font-bold leading-tight text-navy">{m.municipality}</h3>
          <p className="mt-1 line-clamp-2 text-sm font-semibold leading-relaxed text-gray-700">
            {m.programName}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 min-h-6">
          <TypeBadge type={m.type} />
          {benefitCats.slice(0, 2).map((cat) => (
            <span
              key={cat.id}
              className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {cat.name}
            </span>
          ))}
        </div>

        <div className="mt-auto rounded-lg bg-gray-50 px-3 py-2">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-xs text-gray-500">価格</span>
            <span className="font-semibold text-gray-800">{m.price}</span>
          </div>
          {m.benefits[0] && (
            <p className="mt-1 line-clamp-1 text-xs text-gray-600">
              主な特典: {m.benefits[0]}
            </p>
          )}
        </div>

        <p className="text-xs text-gray-400">確認日: {m.lastChecked}</p>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/municipalities/${m.slug}`}
            className="inline-flex min-h-8 items-center justify-center rounded-md border border-blue-300 px-2 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors md:min-h-7 md:py-1"
          >
            詳細を見る
          </Link>
          <a
            href={m.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-8 items-center justify-center gap-1 rounded-md bg-orange-500 px-2 py-1.5 text-xs font-semibold text-white hover:bg-orange-600 transition-colors md:min-h-7 md:py-1"
          >
            公式で確認
            <svg className="h-3 w-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

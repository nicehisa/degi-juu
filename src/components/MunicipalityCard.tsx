import Link from "next/link";
import { Municipality } from "@/data/municipalities";
import { benefitCategories } from "@/data/benefitCategories";
import { StatusBadge, TypeBadge } from "./Badge";
import CTAButton from "./CTAButton";

type Props = {
  municipality: Municipality;
};

export default function MunicipalityCard({ municipality: m }: Props) {
  const benefitCats = benefitCategories.filter((c) =>
    m.benefitCategories.includes(c.id)
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-xl px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-blue-100 text-xs">{m.prefecture}・{m.region}</p>
            <h3 className="text-white font-bold text-lg leading-tight">{m.municipality}</h3>
          </div>
          <StatusBadge status={m.status} />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">制度名</p>
          <p className="text-sm font-semibold text-gray-800">{m.programName}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <TypeBadge type={m.type} />
        </div>

        {/* Benefit Categories */}
        {benefitCats.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {benefitCats.slice(0, 3).map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center gap-0.5 text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5"
              >
                {cat.icon} {cat.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-gray-500 text-xs">価格</span>
            <p className="font-semibold text-gray-800">{m.price}</p>
          </div>
        </div>

        {m.benefits.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-1">主な特典（公表内容）</p>
            <ul className="space-y-0.5">
              {m.benefits.slice(0, 3).map((b, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start gap-1">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-auto">確認日: {m.lastChecked}</p>

        <div className="flex flex-col sm:flex-row gap-2 mt-1">
          <Link
            href={`/municipalities/${m.slug}`}
            className="flex-1 text-center text-sm font-medium text-blue-700 border border-blue-300 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors"
          >
            詳細を見る
          </Link>
          <CTAButton
            href={m.officialUrl}
            variant="secondary"
            external
            className="flex-1 text-sm py-2"
          >
            公式ページ
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

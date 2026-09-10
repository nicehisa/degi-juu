import Link from "next/link";
import { Municipality } from "@/data/municipalities";
import { StatusBadge, TypeBadge } from "./Badge";

type Props = {
  municipalities: Municipality[];
};

export default function CompareTable({ municipalities }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="sticky left-0 bg-blue-700 px-4 py-3 text-left font-semibold min-w-[140px]">
              自治体
            </th>
            <th className="px-4 py-3 text-left font-semibold min-w-[200px]">制度名</th>
            <th className="px-4 py-3 text-left font-semibold min-w-[120px]">種別</th>
            <th className="px-4 py-3 text-left font-semibold min-w-[100px]">参加費用</th>
            <th className="px-4 py-3 text-left font-semibold min-w-[80px]">状況</th>
            <th className="px-4 py-3 text-left font-semibold min-w-[200px]">主な特典</th>
            <th className="px-4 py-3 text-left font-semibold min-w-[100px]">確認日</th>
            <th className="px-4 py-3 text-left font-semibold min-w-[120px]">公式・販売ページ</th>
          </tr>
        </thead>
        <tbody>
          {municipalities.map((m, i) => (
            <tr
              key={m.id}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="sticky left-0 bg-inherit px-4 py-3 font-medium border-r border-gray-200">
                <div className="text-xs text-gray-500">{m.prefecture}</div>
                <div className="font-bold text-gray-800">{m.municipality}</div>
              </td>
              <td className="px-4 py-3 text-gray-700"><Link href={`/municipalities/${m.slug}`} className="inline-flex min-h-11 items-center text-blue-700 underline underline-offset-4">{m.programName}</Link></td>
              <td className="px-4 py-3">
                <TypeBadge type={m.type} />
              </td>
              <td className="px-4 py-3 text-gray-700">{m.price}{m.status === "終了" && <span className="block text-xs text-gray-600">募集時の費用</span>}</td>
              <td className="px-4 py-3">
                <StatusBadge status={m.status} />
              </td>
              <td className="px-4 py-3">
                <ul className="space-y-0.5">
                  {m.benefits.slice(0, 3).map((b, j) => (
                    <li key={j} className="text-xs text-gray-600 flex items-start gap-1">
                      <span className="text-blue-400">•</span> {b}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-3 text-xs text-gray-500">{m.lastChecked}</td>
              <td className="px-4 py-3">
                <a
                  href={m.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 text-sm text-blue-700 hover:underline inline-flex items-center gap-0.5"
                >
                  公式・販売元
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { MunicipalityStatus, MunicipalityType } from "@/data/municipalities";

type StatusBadgeProps = { status: MunicipalityStatus };
type TypeBadgeProps = { type: MunicipalityType };

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<MunicipalityStatus, string> = {
    販売中: "bg-green-100 text-green-800 border-green-200",
    受付中: "bg-blue-100 text-blue-800 border-blue-200",
    終了: "bg-gray-100 text-gray-600 border-gray-200",
    要確認: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const styles: Record<MunicipalityType, string> = {
    デジタル住民票NFT: "bg-purple-100 text-purple-800 border-purple-200",
    デジタル住民NFT: "bg-indigo-100 text-indigo-800 border-indigo-200",
    デジタル住民証: "bg-blue-100 text-blue-800 border-blue-200",
    デジタル会員証: "bg-teal-100 text-teal-800 border-teal-200",
    アプリ型: "bg-orange-100 text-orange-800 border-orange-200",
    その他: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${styles[type]}`}
    >
      {type}
    </span>
  );
}

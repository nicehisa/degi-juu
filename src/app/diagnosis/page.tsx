import type { Metadata } from "next";
import DiagnosisTool from "@/components/DiagnosisTool";

export const metadata: Metadata = {
  title: "おすすめ診断｜デジじゅう",
  description:
    "地域、特典、NFTの有無、参加費用の希望から、条件に近いデジタル住民制度を探せます。",
};

export default function DiagnosisPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">おすすめ診断</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">条件に近い制度を探す</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          気になる地域や特典から、比較しやすい制度を絞り込みます。
          診断結果は参加を推奨するものではなく、公式情報を確認するための入口です。
        </p>
      </div>
      <DiagnosisTool />
    </div>
  );
}

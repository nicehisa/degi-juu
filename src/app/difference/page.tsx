import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ふるさと納税との違い｜デジじゅう",
  description:
    "デジタル住民制度とふるさと納税の違いをわかりやすく解説。税控除・返礼品・住民票など主な違いを比較します。",
};

const DIFF_TABLE = [
  {
    item: "制度の目的",
    digital: "地域との継続的なつながり・関係人口の創出",
    furusato: "自治体への寄付による地域財源の確保",
  },
  {
    item: "税控除",
    digital: "原則として対象外",
    furusato: "条件を満たす場合、寄附金控除・住民税控除あり",
  },
  {
    item: "返礼品・特典",
    digital: "自治体・発行元により異なる（保証なし）",
    furusato: "返礼品がある場合あり（上限規制あり）",
  },
  {
    item: "法律上の住民票",
    digital: "取得できない（住民登録ではない）",
    furusato: "取得できない（住民登録ではない）",
  },
  {
    item: "自治体との関わり方",
    digital: "デジタル上で応援・コミュニティ参加など",
    furusato: "寄付という形での経済的支援",
  },
  {
    item: "申込方法",
    digital: "公式ページ・発行元のサービスから申込",
    furusato: "ふるさと納税ポータルサイト等から寄付",
  },
  {
    item: "費用",
    digital: "各制度により異なる（無料〜有料）",
    furusato: "任意の寄付金額（控除上限あり）",
  },
  {
    item: "複数参加",
    digital: "複数の自治体に参加できる場合が多い",
    furusato: "複数の自治体に寄付可能",
  },
];

export default function DifferencePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">
          ふるさと納税との違い
        </h1>
        <p className="text-gray-600 text-sm">
          デジタル住民制度とふるさと納税は、目的・仕組み・メリットが大きく異なります。
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl px-5 py-4 mb-8">
        <p className="font-bold text-red-800 mb-1">重要</p>
        <p className="text-sm text-red-700 leading-relaxed">
          デジタル住民制度は、ふるさと納税制度ではありません。
          原則として税控除の対象ではなく、法律上の住民票や住民登録を得られるものでもありません。
          節税・税控除を目的とした参加はお控えください。
        </p>
      </div>

      {/* Comparison Table */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy border-l-4 border-blue-600 pl-4 mb-4">
          主な違いの比較
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-gray-600 font-medium w-32">比較項目</th>
                <th className="px-4 py-3 text-left text-blue-700 font-semibold">デジタル住民制度</th>
                <th className="px-4 py-3 text-left text-green-700 font-semibold">ふるさと納税</th>
              </tr>
            </thead>
            <tbody>
              {DIFF_TABLE.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 font-medium text-gray-700 border-r border-gray-100">{row.item}</td>
                  <td className="px-4 py-3 text-gray-700">{row.digital}</td>
                  <td className="px-4 py-3 text-gray-700">{row.furusato}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ※ 上記は一般的な比較です。各制度の詳細は公式ページをご確認ください。
        </p>
      </section>

      {/* Detail Explanations */}
      <section className="space-y-6 mb-10">
        <h2 className="text-xl font-bold text-navy border-l-4 border-blue-600 pl-4">
          詳しい説明
        </h2>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-bold text-blue-800 mb-2">税控除について</h3>
          <p className="text-sm text-blue-900 leading-relaxed">
            ふるさと納税では、一定額を超えた寄附分が所得税・住民税から控除される仕組みがあります（条件・上限あり）。
            一方、デジタル住民制度への参加費用は、原則として税控除の対象ではありません。
            節税目的での参加は想定していない制度です。
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-800 mb-2">特典・返礼品について</h3>
          <p className="text-sm text-green-900 leading-relaxed">
            ふるさと納税には、自治体が用意した返礼品を受け取れる仕組みがあります。
            デジタル住民制度では、各自治体や発行元が独自に設定した特典（コミュニティ参加・観光特典等）がある場合がありますが、
            内容・有無・条件は制度によって大きく異なり、保証されるものではありません。
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
          <h3 className="font-bold text-orange-800 mb-2">地域との関わり方の違い</h3>
          <p className="text-sm text-orange-900 leading-relaxed">
            ふるさと納税は「経済的な寄付」という形で地域を支援する仕組みです。
            デジタル住民制度は「デジタル上でのつながり・関係人口の創出」を目的としており、
            地域コミュニティへの参加や地域情報の受け取りなど、継続的な関係性を育む点が特徴です。
          </p>
        </div>
      </section>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-center">
        <p className="text-sm text-gray-700 mb-4">
          デジタル住民制度について詳しく知りたい方はこちら
        </p>
        <Link
          href="/about"
          className="inline-flex items-center text-blue-600 hover:underline text-sm font-medium"
        >
          デジタル住民制度とは →
        </Link>
      </div>
    </div>
  );
}

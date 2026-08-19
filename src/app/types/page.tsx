import type { Metadata } from "next";
import Link from "next/link";
import { municipalities, MunicipalityType } from "@/data/municipalities";
import { TypeBadge } from "@/components/Badge";
import CommonNotice from "@/components/CommonNotice";

export const metadata: Metadata = {
  title: "制度タイプから探す｜デジじゅう",
  description:
    "デジタル住民票、デジタル住民票NFT、デジタル住民NFT、デジタル住民証、デジタル会員証、アプリ型など制度のタイプから探せます。",
};

type TypeInfo = {
  type: MunicipalityType;
  description: string;
  forUser: string;
  caution: string;
};

const TYPE_INFO: TypeInfo[] = [
  {
    type: "デジタル住民票",
    description:
      "NFTではなく、アプリやWebサービス等で地域との関係性を示す「デジタル住民票」として案内される制度。",
    forUser: "NFTウォレットを使わずに、地域とのつながりを持てる制度を探している方",
    caution:
      "名称に住民票とあっても、法律上の住民票・住民登録・転入手続きとは異なります。",
  },
  {
    type: "デジタル住民票NFT",
    description:
      "ブロックチェーン上に発行されるNFTとして「デジタル住民票」を名乗る制度。デジタルウォレットで保有します。",
    forUser: "NFTや暗号資産に関心がある方、デジタルコレクションとして地域を応援したい方",
    caution:
      "NFTウォレットの設定が必要な場合があります。法律上の住民票とは異なります。",
  },
  {
    type: "デジタル住民NFT",
    description:
      "「デジタル住民」であることを示すNFT型の制度。地域との関係性をデジタル上で表現します。",
    forUser: "NFTに関心がある方、特定の地域のファンとしてデジタル上でつながりたい方",
    caution:
      "NFTウォレットの設定が必要な場合があります。法律上の住民票・住民登録とは異なります。",
  },
  {
    type: "デジタル住民証",
    description:
      "NFTではなく、デジタル証明書・IDカード形式で発行される地域との関係人口制度。",
    forUser: "NFTに詳しくなくても参加しやすい制度を探している方",
    caution:
      "各制度によって登録・利用方法が異なります。法律上の住民証明とは異なります。",
  },
  {
    type: "デジタル会員証",
    description:
      "地域のファンクラブや会員制サービスとして提供されるデジタル会員証型の制度。",
    forUser: "地域の特定施設・団体のファン、会員サービスとして地域を応援したい方",
    caution:
      "会員制サービスのため、特典内容や会費が異なる場合があります。",
  },
  {
    type: "アプリ型",
    description:
      "スマートフォンアプリやウェブサービスを通じて提供される関係人口向け制度。",
    forUser: "NFTより手軽に地域とつながりたい方、スマホアプリで管理したい方",
    caution:
      "利用するアプリ・サービスに応じた登録が必要です。",
  },
  {
    type: "その他",
    description:
      "上記分類に当てはまらない独自の形式で運営されている地域関係人口制度。",
    forUser: "幅広い形式の制度に関心がある方",
    caution:
      "各制度の内容は大きく異なる場合があります。公式ページで詳細をご確認ください。",
  },
];

export default function TypesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">制度タイプから探す</h1>
        <p className="text-gray-600 text-sm">
          NFT型、アプリ型、会員証型など、制度の形式からデジタル住民制度を探せます。
        </p>
      </div>

      <div className="mb-6">
        <CommonNotice />
      </div>

      <div className="space-y-6">
        {TYPE_INFO.map((info) => {
          const matched = municipalities.filter((m) => m.type === info.type);
          return (
            <div
              key={info.type}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <TypeBadge type={info.type} />
                <span className="font-bold text-gray-800">{info.type}</span>
                <span className="ml-auto text-sm text-blue-700 font-semibold">
                  {matched.length}件
                </span>
              </div>
              <div className="p-5 grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">制度の説明</p>
                  <p className="text-gray-700 leading-relaxed">{info.description}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">向いているユーザー</p>
                  <p className="text-gray-700 leading-relaxed">{info.forUser}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">注意点</p>
                  <p className="text-gray-600 leading-relaxed text-xs bg-amber-50 border border-amber-100 rounded p-2">{info.caution}</p>
                </div>
              </div>
              {matched.length > 0 && (
                <div className="px-5 pb-5">
                  <p className="text-xs text-gray-500 mb-2">掲載中の自治体</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {matched.slice(0, 6).map((m) => (
                      <Link
                        key={m.id}
                        href={`/municipalities/${m.slug}`}
                        className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-1 hover:bg-blue-100 transition-colors"
                      >
                        {m.prefecture} {m.municipality}
                      </Link>
                    ))}
                    {matched.length > 6 && (
                      <span className="text-xs text-gray-400 px-2 py-1">他{matched.length - 6}件</span>
                    )}
                  </div>
                  <Link
                    href={`/municipalities?type=${encodeURIComponent(info.type)}`}
                    className="inline-flex items-center text-sm text-blue-600 hover:underline font-medium"
                  >
                    このタイプの制度を一覧で見る →
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

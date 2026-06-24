import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "デジタル住民制度とは｜デジじゅう",
  description:
    "デジタル住民票やデジタル住民NFTの仕組み、法律上の住民票との違い、ふるさと納税との違いをわかりやすく解説します。",
};

const SECTIONS = [
  {
    id: "what",
    title: "デジタル住民制度とは？",
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <p>
          デジタル住民制度とは、地域外に住む人がデジタル上で自治体や地域とつながり、
          応援・参加できる仕組みです。
          各自治体が独自に企画・運営しており、
          「デジタル住民票NFT」「デジタル住民NFT」「デジタル住民証」
          「地域ファン向け会員証」など、名称や内容は自治体によって異なります。
        </p>
        <p>
          多くの制度は、地域への関心や応援の気持ちを形にしたもので、
          観光特典・地域コミュニティへの参加・限定イベント案内などが
          提供されている場合があります。
          ただし、特典の内容・有無・条件は各制度によって大きく異なります。
        </p>
      </div>
    ),
  },
  {
    id: "not-jumin",
    title: "法律上の住民票とは違う",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-gray-700 leading-relaxed">
          デジタル住民票という名称が使われる場合でも、
          住民基本台帳法に基づく住民票・住民登録とは<strong>まったく異なります</strong>。
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800 space-y-1">
          <p className="font-bold">以下はデジタル住民制度では得られません：</p>
          <ul className="space-y-1 mt-2">
            {[
              "住民基本台帳上の住民票（法的な居住証明）",
              "転入・転出の手続き・住民登録",
              "行政サービスの利用資格（国民健康保険・年金・各種補助金など）",
              "選挙権・被選挙権",
              "住民票の写しの取得",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-red-500 shrink-0">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "why",
    title: "なぜ自治体が取り組むのか",
    content: (
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">
        <p>
          多くの自治体では、少子高齢化・人口減少を背景に、
          「関係人口」（移住はしないが地域と継続的につながる人）の創出に取り組んでいます。
        </p>
        <p>
          デジタル住民制度は、地域への関心を持つ人が全国どこからでも参加できる仕組みとして、
          関係人口の拡大・地域ブランディング・コミュニティ形成を目的として
          導入されるケースが増えています。
        </p>
      </div>
    ),
  },
  {
    id: "kankei-jinko",
    title: "関係人口とは",
    content: (
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">
        <p>
          関係人口とは、移住した「定住人口」でも、観光に来た「交流人口」でもなく、
          地域と多様に関わる人々のことです（総務省の定義に基づく概念）。
        </p>
        <p>
          ふるさとに愛着を持つ人、仕事で地域と関わる人、
          地域のファンとして応援したい人など、さまざまな関わり方が含まれます。
          デジタル住民制度は、この関係人口を増やすための手段のひとつとして位置づけられています。
        </p>
      </div>
    ),
  },
  {
    id: "nft-vs-app",
    title: "NFT型とアプリ型の違い",
    content: (
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-bold text-purple-800 mb-2">NFT型</h4>
            <p>
              ブロックチェーン上に発行されるNFT（非代替性トークン）として提供される制度。
              デジタルウォレットで保有します。
              NFTに関する知識が必要な場合があります。
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-bold text-orange-800 mb-2">アプリ型・デジタル証明書型</h4>
            <p>
              スマートフォンアプリやウェブサービス上で提供される制度。
              NFTの知識がなくても利用しやすい場合が多いです。
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ※ どちらの型でも、法律上の住民票・住民登録とは異なります。
        </p>
      </div>
    ),
  },
  {
    id: "furusato",
    title: "ふるさと納税との違い",
    content: (
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900">
          <strong>デジタル住民制度はふるさと納税ではありません。</strong>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>ふるさと納税のような税控除は、原則として受けられません</li>
            <li>返礼品制度ではありません</li>
            <li>寄附控除・住民税控除の対象ではありません</li>
          </ul>
        </div>
        <p>
          デジタル住民制度に参加する場合は、税控除を目的とせず、
          純粋な地域応援・関係づくりとして参加することをご理解ください。
          各制度の費用・条件は必ず公式ページでご確認ください。
        </p>
      </div>
    ),
  },
  {
    id: "checklist",
    title: "参加前に確認すべきこと",
    content: (
      <div className="text-sm text-gray-700 leading-relaxed">
        <ul className="space-y-2">
          {[
            "制度の目的・内容を公式ページで確認する",
            "特典の内容・利用条件・有効期限を確認する",
            "価格・支払い方法を確認する",
            "NFT型の場合、ウォレット設定等が必要か確認する",
            "制度が現在も継続しているか（販売状況）を確認する",
            "税控除が受けられないことを理解した上で参加する",
            "投資目的での購入は推奨されません",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-blue-500 shrink-0 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">
          デジタル住民制度とは
        </h1>
        <p className="text-gray-600 text-sm">
          初めての方向けに、デジタル住民制度の仕組み・注意点をわかりやすく解説します。
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <p className="text-xs font-bold text-blue-700 mb-2">目次</p>
        <ol className="space-y-1">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-sm text-blue-700 hover:underline"
              >
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-10">
        {SECTIONS.map((s, i) => (
          <section key={s.id} id={s.id}>
            <h2 className="text-xl font-bold text-navy border-l-4 border-blue-600 pl-4 mb-4">
              {i + 1}. {s.title}
            </h2>
            {s.content}
          </section>
        ))}
      </div>

      <div className="mt-10 bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
        <p className="text-sm text-gray-700 mb-4">
          全国の制度を比較してみましょう
        </p>
        <CTAButton href="/municipalities" variant="primary">
          自治体一覧を見る
        </CTAButton>
      </div>
    </div>
  );
}

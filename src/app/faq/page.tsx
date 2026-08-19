import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "よくある質問｜デジじゅう",
  description:
    "デジタル住民票、デジタル住民NFT、ふるさと納税、税控除、特典、公式ページ確認についてのよくある質問です。",
};

const faqs = [
  {
    q: "デジタル住民票は法律上の住民票ですか？",
    a: "いいえ。デジじゅうで紹介するデジタル住民票等は、法律上の住民票、住民登録、転入手続き、居住証明とは異なります。",
  },
  {
    q: "ふるさと納税と同じですか？",
    a: "いいえ。ふるさと納税とは制度目的や申込方法が異なります。原則として税控除の対象ではありません。",
  },
  {
    q: "特典は必ず受けられますか？",
    a: "保証されるものではありません。特典内容、利用条件、期間、対象者は自治体・発行元により異なります。",
  },
  {
    q: "NFTは投資目的で購入できますか？",
    a: "デジじゅうでは投資性や値上がり期待を目的とした参加を推奨していません。制度の趣旨や公式情報をご確認ください。",
  },
  {
    q: "掲載情報はどのように確認していますか？",
    a: "自治体公式ページ、公式PDF、制度運営主体の公式発表を優先して確認しています。確認日は各詳細ページに表示しています。",
  },
  {
    q: "自治体として掲載依頼できますか？",
    a: "はい。自治体・制度運営者向けの掲載依頼フォームから、制度名と公式ページURLを添えてご連絡ください。",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">誤認防止・不安解消</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">よくある質問</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          デジタル住民制度を検討する前に確認しておきたい基本情報をまとめています。
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <section key={faq.q} className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-base font-bold text-navy">{faq.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{faq.a}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-5">
        <h2 className="font-bold text-navy">掲載情報の確認・修正について</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          掲載情報に誤りや更新がある場合は、公式情報のURLを添えてお問い合わせください。
        </p>
        <Link href="/contact" className="mt-4 inline-flex rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
          問い合わせる
        </Link>
      </div>
    </div>
  );
}

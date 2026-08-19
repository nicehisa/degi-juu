import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "掲載基準・編集方針｜デジじゅう",
  description: "デジじゅうの掲載基準、情報確認方法、広告・PR表記方針をまとめています。",
};

const sections = [
  {
    title: "掲載対象",
    items: [
      "自治体、または制度運営主体が公表しているデジタル住民制度",
      "デジタル住民票、デジタル住民NFT、デジタル住民証、地域ファン向け会員証",
      "関係人口、地域ファンづくり、地域応援を目的とする制度",
    ],
  },
  {
    title: "掲載しない・慎重に扱う内容",
    items: [
      "法律上の住民票や住民登録ができるように見える表現",
      "ふるさと納税や税控除と誤認される表現",
      "NFTの値上がり、投資性、利益期待を煽る表現",
      "公式情報が確認できない紹介記事やSNS投稿のみの情報",
    ],
  },
  {
    title: "確認方法",
    items: [
      "自治体公式ページ、公式PDF、制度運営主体の公式発表を優先",
      "価格、販売状況、対象者、特典条件、申込先を確認",
      "確認日をデータに残し、変更可能性を明記",
      "自動検知候補は人の確認を挟んでから公開データに反映",
    ],
  },
  {
    title: "広告・PR表記",
    items: [
      "広告枠にはPRまたは広告であることを明記",
      "自治体公式情報と広告情報を混同させない",
      "掲載可否は読者の誤認防止とサイトの中立性を優先して判断",
    ],
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">信頼性・透明性</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">掲載基準・編集方針</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          デジじゅうは自治体公式サイトではありません。読者が制度を誤認しないよう、掲載基準と確認方針を明確にしています。
        </p>
      </div>

      <div className="space-y-5">
        {sections.map((section) => (
          <section key={section.title} className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-bold text-navy">{section.title}</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
              {section.items.map((item) => (
                <li key={item}>・{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

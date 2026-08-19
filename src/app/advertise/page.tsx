import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "広告・PR掲載について｜デジじゅう",
  description:
    "デジじゅうの広告・PR掲載相談ページです。地域ファン、関係人口、自治体DXに関心のあるユーザーへ情報を届けます。",
};

const placements = [
  {
    title: "制度詳細ページPR枠",
    desc: "自治体制度を検討しているユーザーに、関連サービスや地域施策を自然に案内できます。",
  },
  {
    title: "カテゴリページ協賛枠",
    desc: "地域・特典・制度タイプ別ページで、比較検討中のユーザーに接点を作れます。",
  },
  {
    title: "記事・事例型タイアップ",
    desc: "自治体DX、関係人口創出、地域ファン施策の文脈で、読み物として訴求できます。",
  },
];

export default function AdvertisePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">広告・PR掲載</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">
          地域に関心のあるユーザーへ、自然に情報を届ける
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          デジじゅうでは、自治体DX・地域ファンづくり・関係人口創出に関連する広告・PR掲載の相談を受け付けています。
          掲載可否は、読者の誤認防止とサイトの中立性を重視して確認します。
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {placements.map((item) => (
          <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-navy">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-950">掲載ポリシー</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-amber-900">
            <li>・自治体公式サイトのように見える表現は避けます</li>
            <li>・法律上の住民票、税控除、ふるさと納税との誤認を避けます</li>
            <li>・NFTの投資性や値上がり期待を煽る内容は掲載しません</li>
            <li>・広告・PRであることが分かる表示を行います</li>
          </ul>
        </aside>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <InquiryForm kind="advertising" />
        </section>
      </div>
    </div>
  );
}

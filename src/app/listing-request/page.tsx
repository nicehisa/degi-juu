import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "自治体・運営者向け掲載依頼｜デジじゅう",
  description:
    "デジじゅうへのデジタル住民票・デジタル住民NFT・地域ファン向け会員証の掲載依頼フォームです。",
};

const reviewItems = [
  "自治体公式ページ、または制度運営主体の公式情報が確認できること",
  "法律上の住民票・住民登録・転入手続きと誤認されない表現であること",
  "価格、販売状況、対象者、特典条件が確認できること",
  "NFTの投資性や値上がり期待を訴求していないこと",
];

export default function ListingRequestPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">自治体・制度運営者の方へ</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">
          デジタル住民制度の掲載依頼
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          デジじゅうでは、デジタル住民票・デジタル住民NFT・デジタル住民証・地域ファン向け会員証など、
          関係人口づくりに関する制度情報を掲載しています。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-4">
          <section className="rounded-xl border border-orange-100 bg-orange-50 p-5">
            <h2 className="font-bold text-navy">掲載前に確認すること</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
              {reviewItems.map((item) => (
                <li key={item}>・{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-bold text-navy">掲載までの流れ</h2>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
              <li>1. フォームから制度情報を送信</li>
              <li>2. 公式情報・表現リスクを確認</li>
              <li>3. 必要に応じて内容確認</li>
              <li>4. 掲載データへ反映</li>
            </ol>
          </section>
        </aside>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <InquiryForm kind="listing" />
        </section>
      </div>
    </div>
  );
}

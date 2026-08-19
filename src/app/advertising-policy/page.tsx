import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "広告・PR表記ポリシー｜デジじゅう",
  description: "デジじゅうの広告・PR掲載時の表記方針、非掲載基準、審査方針をまとめています。",
};

export default function AdvertisingPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">広告掲載の透明性</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">広告・PR表記ポリシー</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          広告・PR掲載は、読者が公式情報と広告情報を区別できることを最優先に運用します。
        </p>
      </div>

      <div className="space-y-5">
        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-bold text-navy">表記ルール</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
            <li>・広告枠には「PR掲載枠」「広告」「PR」のいずれかを明記します</li>
            <li>・自治体公式情報や制度内容と広告内容を同一に見せません</li>
            <li>・広告から公式制度への参加を保証する表現は使いません</li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-bold text-navy">非掲載または修正対象</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
            <li>・税控除、住民登録、法律上の住民票と誤認される表現</li>
            <li>・NFTの値上がり、投資性、利益を期待させる表現</li>
            <li>・「必ず特典」「一番おすすめ」「お得」など根拠が不十分な断定表現</li>
            <li>・自治体公式サイトであるかのように見せる表現</li>
          </ul>
        </section>

        <section className="rounded-xl border border-orange-200 bg-orange-50 p-5">
          <h2 className="text-lg font-bold text-navy">掲載相談</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            掲載可否や掲載形式は、サイトの中立性と読者の誤認防止を前提に確認します。
          </p>
          <Link href="/advertise" className="mt-4 inline-flex rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
            広告・PR掲載を相談する
          </Link>
        </section>
      </div>
    </div>
  );
}

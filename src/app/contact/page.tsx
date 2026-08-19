import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ・掲載修正依頼｜デジじゅう",
  description:
    "デジじゅうへのお問い合わせ、掲載情報の修正依頼はこちらから受け付けています。",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">
          お問い合わせ・掲載修正依頼
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          掲載情報の修正依頼、一般の方からのご意見・ご質問をお受けしています。
          新規掲載依頼や広告相談は専用フォームをご利用ください。
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800 space-y-1">
        <p className="font-bold">ご利用にあたって</p>
        <ul className="list-disc list-inside space-y-1 text-xs mt-1">
          <li>掲載情報の誤りや更新が必要な情報は「修正依頼」をご選択ください</li>
          <li>新たな制度の掲載をご希望の場合は専用の掲載依頼フォームをご利用ください</li>
          <li>広告・PR掲載の相談は広告・PR掲載ページからお送りください</li>
          <li>ご回答まで数日〜1週間程度かかる場合があります</li>
          <li>内容によってはご回答できない場合があります</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <ContactForm />
      </div>
    </div>
  );
}

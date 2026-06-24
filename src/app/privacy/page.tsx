import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜デジじゅう",
  description: "デジじゅうのプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">
          プライバシーポリシー
        </h1>
        <p className="text-gray-500 text-xs">最終更新日：2026年6月1日</p>
      </div>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">1. はじめに</h2>
          <p>
            本サイト「デジじゅう」（以下、「当サイト」）では、お問い合わせフォーム等を通じて
            個人情報をお預かりする場合があります。
            本ポリシーでは、個人情報の取り扱い方針について説明します。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">2. 取得する情報</h2>
          <p>当サイトでは、以下の情報を取得する場合があります。</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>お問い合わせフォームに入力されたお名前、メールアドレス、お問い合わせ内容</li>
            <li>アクセス解析ツールを通じて取得する閲覧情報（IPアドレス、ブラウザ情報等）</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">3. 利用目的</h2>
          <p>取得した情報は、以下の目的に使用します。</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>お問い合わせへの回答・対応</li>
            <li>掲載情報の更新・修正対応</li>
            <li>サイトの改善・運営のための分析</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">4. 第三者提供</h2>
          <p>
            当サイトは、法令に基づく場合を除き、
            取得した個人情報を第三者に提供・販売・共有することはありません。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">5. アクセス解析について</h2>
          <p>
            当サイトでは、Googleアナリティクス等のアクセス解析ツールを利用する場合があります。
            これらのツールはCookieを使用して、匿名のトラフィックデータを収集します。
            個人を特定する情報は収集しません。
            Cookieの使用を無効にしたい場合は、ブラウザの設定からCookieを無効にすることができます。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">6. Cookieについて</h2>
          <p>
            当サイトでは、ユーザー体験の向上やアクセス解析のためにCookieを使用する場合があります。
            ブラウザの設定によりCookieを拒否することができますが、
            その場合、サイトの一部機能が利用できない場合があります。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">7. お問い合わせ</h2>
          <p>
            個人情報の取り扱いに関するご質問・ご要望は、
            サイト内のお問い合わせフォームからご連絡ください。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">8. ポリシーの改定</h2>
          <p>
            本ポリシーは、必要に応じて予告なく変更する場合があります。
            変更後のポリシーは、本ページに掲載した時点から効力を生じるものとします。
          </p>
        </section>
      </div>
    </div>
  );
}

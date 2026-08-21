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
        <p className="text-gray-500 text-xs">最終更新日：2026年8月21日</p>
      </div>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">1. はじめに</h2>
          <p>
            本サイト「デジじゅう」（以下、「当サイト」）では、お問い合わせフォーム、掲載依頼フォーム、
            広告・PR相談フォーム、メールマガジン登録フォーム等を通じて個人情報をお預かりする場合があります。
            本ポリシーでは、個人情報の取り扱い方針について説明します。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">2. 事業者（個人情報取扱事業者）</h2>
          <dl className="rounded-xl border border-gray-200 bg-white p-4 text-sm">
            <div className="grid gap-1 py-2 sm:grid-cols-[140px_1fr]">
              <dt className="font-semibold text-gray-600">運営会社</dt>
              <dd>フォーティテュード ジャパン株式会社</dd>
            </div>
            <div className="grid gap-1 py-2 sm:grid-cols-[140px_1fr]">
              <dt className="font-semibold text-gray-600">所在地</dt>
              <dd>〒150-0044 東京都渋谷区円山町5-5 Navi渋谷ビル3F</dd>
            </div>
            <div className="grid gap-1 py-2 sm:grid-cols-[140px_1fr]">
              <dt className="font-semibold text-gray-600">個人情報お問い合わせ窓口</dt>
              <dd>info@fortitudejapan.com</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">3. 取得する情報</h2>
          <p>当サイトでは、以下の情報を取得する場合があります。</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>各種フォームに入力されたお名前、メールアドレス、団体名、役職、自治体名、制度名、URL、ご相談内容</li>
            <li>メールマガジン登録時のメールアドレス、関心テーマ、同意の記録（同意日時）</li>
            <li>アクセス解析ツールを通じて取得する閲覧情報（IPアドレス、ブラウザ情報等）</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">4. 利用目的</h2>
          <p>取得した情報は、以下の目的に使用します。</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>お問い合わせ・掲載依頼・広告PR相談への回答および対応</li>
            <li>掲載情報の更新・修正対応</li>
            <li>メールマガジンおよび更新情報の配信</li>
            <li>サイトの改善・運営のための分析</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">5. 第三者提供</h2>
          <p>
            当サイトは、法令に基づく場合およびご本人の同意がある場合を除き、
            取得した個人情報を第三者に提供・販売することはありません。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">
            6. 業務委託および外国にある第三者への提供
          </h2>
          <p>
            当サイトでは、フォーム送信内容の通知・自動返信メールの送信に、外部のメール配信サービス
            <strong>Resend（Resend, Inc.／所在国：アメリカ合衆国）</strong>
            を利用しています。フォームに入力された内容は、送信処理のため同社のサーバーへ送信・保管されます。
          </p>
          <p className="mt-2">
            また、サイトの配信基盤として <strong>Vercel Inc.（所在国：アメリカ合衆国）</strong> を利用しており、
            アクセスログ等が同社のサーバーで処理される場合があります。
          </p>
          <p className="mt-2">
            これらは利用目的の達成に必要な範囲での委託であり、当社は委託先に対して必要かつ適切な監督を行います。
            各社の個人情報の取り扱いについては、それぞれの公式サイトに掲載されているプライバシーポリシーをご確認ください。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">7. 保存期間</h2>
          <p>
            お問い合わせ・掲載依頼・広告PR相談の内容は、対応完了後、
            経緯確認および再問い合わせ対応のために原則3年間保管し、期間経過後に削除します。
            メールマガジンの登録情報は、配信停止のお申し出があった時点、
            またはメールマガジンの配信を終了した時点で削除します。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">
            8. 開示・訂正・利用停止等のご請求
          </h2>
          <p>
            ご本人からの、保有個人データの利用目的の通知、開示、内容の訂正・追加・削除、
            利用の停止・消去、第三者への提供の停止のご請求については、
            上記2.のお問い合わせ窓口（info@fortitudejapan.com）で承ります。
            ご本人であることを確認したうえで、法令に従い、合理的な期間内に対応します。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">9. メールマガジンの配信停止</h2>
          <p>
            メールマガジンは、ご本人の同意（オプトイン）にもとづき配信します。
            配信停止をご希望の場合は、配信メール本文に記載の停止用リンク、
            または info@fortitudejapan.com へのご連絡でいつでも停止できます。
            配信停止後、新たな配信は行いません。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">10. アクセス解析について</h2>
          <p>
            当サイトでは、Googleアナリティクス等のアクセス解析ツールを利用する場合があります。
            これらのツールはCookieを使用して、匿名のトラフィックデータを収集します。
            個人を特定する情報は収集しません。
            Cookieの使用を無効にしたい場合は、ブラウザの設定からCookieを無効にすることができます。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">11. Cookieについて</h2>
          <p>
            当サイトでは、ユーザー体験の向上やアクセス解析のためにCookieを使用する場合があります。
            ブラウザの設定によりCookieを拒否することができますが、
            その場合、サイトの一部機能が利用できない場合があります。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">12. 安全管理措置</h2>
          <p>
            当サイトは、取得した個人情報の漏えい、滅失またはき損の防止その他の安全管理のために、
            アクセス権限の制限、通信の暗号化（HTTPS）、管理画面の認証設定等、必要かつ適切な措置を講じます。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">13. お問い合わせ</h2>
          <p>
            個人情報の取り扱いに関するご質問・ご要望は、
            サイト内のお問い合わせフォーム、または info@fortitudejapan.com からご連絡ください。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-gray-800 text-base mb-3">14. ポリシーの改定</h2>
          <p>
            本ポリシーは、必要に応じて変更する場合があります。
            重要な変更を行う場合は、本ページに掲載してお知らせします。
            変更後のポリシーは、本ページに掲載した時点から効力を生じるものとします。
          </p>
        </section>
      </div>
    </div>
  );
}

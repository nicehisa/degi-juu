import Link from "next/link";

const DISCLAIMER =
  "本サイトで紹介しているデジタル住民票・デジタル住民NFT・デジタル住民証等は、各自治体等が実施する関係人口・地域応援・会員証型の制度です。法律上の住民登録、住民基本台帳上の住民票、転入手続き、行政上の居住証明とは異なります。また、ふるさと納税制度とは異なり、原則として税控除の対象ではありません。掲載情報は確認日時点の内容であり、価格、販売状況、特典、利用条件等は変更される場合があります。最新情報は必ず各自治体または発行元の公式ページをご確認ください。";

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      {/* Disclaimer */}
      <div className="bg-yellow-50 border-t-4 border-yellow-400">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-xs text-gray-700 leading-relaxed">{DISCLAIMER}</p>
        </div>
      </div>

      {/* Footer Body */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold text-white mb-2">デジじゅう</h2>
            <p className="text-sm text-blue-200 leading-relaxed">
              全国のデジタル住民制度をわかりやすく探せる比較・まとめサイト
            </p>
            <p className="text-xs text-blue-300 mt-2">
              ※本サイトは自治体公式サイトではありません
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-200 mb-3">制度を探す</h3>
            <ul className="space-y-2">
              {[
                { href: "/municipalities", label: "自治体一覧" },
                { href: "/regions", label: "地域から探す" },
                { href: "/benefits", label: "特典から探す" },
                { href: "/types", label: "制度タイプから探す" },
                { href: "/compare", label: "比較する" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-blue-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-200 mb-3">ガイド</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "デジタル住民制度とは" },
                { href: "/difference", label: "ふるさと納税との違い" },
                { href: "/faq", label: "よくある質問" },
                { href: "/updates", label: "更新履歴" },
                { href: "/editorial-policy", label: "掲載基準・編集方針" },
                { href: "/advertising-policy", label: "広告・PR表記ポリシー" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-blue-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-200 mb-3">サイト情報</h3>
            <ul className="space-y-2">
              {[
                { href: "/company", label: "運営会社" },
                { href: "/legal", label: "注意事項・免責事項" },
                { href: "/privacy", label: "プライバシーポリシー" },
                { href: "/listing-request", label: "自治体向け掲載依頼" },
                { href: "/advertise", label: "広告・PR掲載" },
                { href: "/contact", label: "お問い合わせ・掲載修正依頼" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-blue-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 text-center">
          <p className="text-xs text-blue-400">
            © デジじゅう / フォーティテュード ジャパン株式会社
          </p>
        </div>
      </div>
    </footer>
  );
}

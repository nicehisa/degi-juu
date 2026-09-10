import Link from "next/link";
import CTAButton from "./CTAButton";

export function HomeIntroduction() {
  return (
    <section className="border-b border-gray-100 bg-white py-12 md:py-16" aria-labelledby="home-introduction">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-3 text-sm font-semibold text-orange-700">はじめての方へ</p>
        <h2 id="home-introduction" className="text-2xl md:text-3xl text-navy">好きなまちと、これからもつながる。</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-gray-700">
          デジタル住民制度は、地域の外に住む人も、その地域とつながり、交流や活動に参加できる仕組みです。
          デジタル住民票や会員証をきっかけに、あなたに合う地域との関わり方を探せます。
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {title: "地域を訪れる", text: "観光施設や宿泊などの特典をきっかけに、気になるまちへ。", href: "/benefits/tourism", link: "観光の特典を見る"},
            {title: "地域の人と交流する", text: "地域ファンのコミュニティで、人やまちとのつながりを楽しむ。", href: "/benefits/community", link: "交流できる制度を見る"},
            {title: "イベントに参加する", text: "地域のイベントや体験を通じて、まちの魅力をもっと知る。", href: "/benefits/event", link: "イベントの特典を見る"},
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-orange-100 bg-orange-50/50 p-6">
              <h3 className="text-lg text-navy">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-gray-700">{item.text}</p>
              <Link href={item.href} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-orange-800 underline underline-offset-4">{item.link} →</Link>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-gray-600">特典や参加できる活動は制度によって異なります。法律上の住民票・住民登録とは異なる制度です。</p>
        <Link href="/about" className="mt-3 inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">デジタル住民制度を詳しく知る →</Link>
      </div>
    </section>
  );
}

export function HomeParticipationSteps() {
  return (
    <section className="border-b border-orange-100 bg-orange-50/50 py-12 md:py-16" aria-labelledby="participation-steps">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="participation-steps" className="text-2xl md:text-3xl text-navy">参加までの3ステップ</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["気になる制度を探す", "地域や特典から、応援したいまちを見つけましょう。"],
            ["費用と参加条件を確認する", "対象者、受付状況、特典の条件、必要な準備を詳細ページで確認します。"],
            ["公式サイトで申し込む", "最新の条件を確認し、自治体・発行元の案内に沿って手続きします。"],
          ].map(([title, text], index) => (
            <li key={title} className="rounded-xl border border-orange-100 bg-white p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-800">{index + 1}</span>
              <h3 className="mt-4 text-lg text-navy">{title}</h3>
              <p className="mt-3 text-base leading-7 text-gray-700">{text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm leading-6 text-gray-600">デジじゅうでは申込・購入手続きや代金の受け取りは行いません。リンク先の公式サイトでお手続きください。</p>
      </div>
    </section>
  );
}

export function HomeQuestions() {
  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="home-questions">
      <div className="mx-auto max-w-3xl px-4">
        <h2 id="home-questions" className="text-2xl md:text-3xl text-navy">参加前のよくある質問</h2>
        <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
          {[
            ["その地域に引っ越す必要はありますか？", "地域外の方を対象とした制度も掲載しています。住民登録や移住の手続きとは異なります。年齢・居住地などの対象条件は制度ごとに確認してください。"],
            ["参加にはいくらかかりますか？", "費用は制度ごとに異なります。掲載価格に加え、更新料や決済手数料などが必要かどうかも公式サイトで確認してください。"],
            ["NFTや暗号資産に詳しくなくても参加できますか？", "NFTを使わない会員証型などの制度もあります。NFT型でも決済方法や必要なアカウントは異なります。詳しい準備は各発行元の案内をご確認ください。"],
            ["申し込みはこのサイトでできますか？", "デジじゅうは制度を比較・紹介するサイトです。詳細ページのリンクから公式サイトへ進み、最新の条件を確認してお申し込みください。"],
          ].map(([q, a]) => (
            <details key={q} className="py-2">
              <summary className="cursor-pointer py-4 text-base font-semibold leading-7 text-navy">{q}</summary>
              <p className="pb-5 text-base leading-8 text-gray-700">{a}</p>
            </details>
          ))}
        </div>
        <Link href="/faq" className="mt-4 inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">その他の質問を見る →</Link>
        <div className="mt-10 rounded-xl bg-orange-50 px-6 py-8 text-center">
          <h3 className="text-xl text-navy">あなたに合う、地域とのつながりを。</h3>
          <p className="mt-3 text-base leading-7 text-gray-700">気になるまちの費用や特典を比べて、参加したい制度を探しましょう。</p>
          <CTAButton href="/municipalities" className="mt-6">自分に合う制度を探す</CTAButton>
        </div>
      </div>
    </section>
  );
}

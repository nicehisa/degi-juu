import type { Metadata } from "next";
import Link from "next/link";
import { municipalities } from "@/data/municipalities";
import detectedMunicipalities from "@/data/detectedMunicipalities.json";
import { promotions } from "@/data/promotions";
import { getDataSourceStatus } from "@/lib/dataSource";

export const metadata: Metadata = {
  title: "管理画面｜デジじゅう",
  description: "デジじゅうの運用状況を確認する管理者向けページです。",
  robots: {
    index: false,
    follow: false,
  },
};

const operations = [
  {
    href: "/admin/detected",
    title: "自動検知候補",
    desc: "日次検知で見つかった未確認候補を確認します。",
  },
  {
    href: "/listing-request",
    title: "掲載依頼フォーム",
    desc: "自治体・制度運営者向けの掲載依頼導線を確認します。",
  },
  {
    href: "/advertise",
    title: "広告・PR相談フォーム",
    desc: "広告メニューと相談フォームの表示を確認します。",
  },
  {
    href: "/contact",
    title: "お問い合わせフォーム",
    desc: "一般問い合わせ・修正依頼の送信導線を確認します。",
  },
  {
    href: "/api/municipalities",
    title: "自治体データAPI",
    desc: "現在のデータ取得元と自治体データの返却件数を確認します。",
  },
  {
    href: "/diagnosis",
    title: "おすすめ診断",
    desc: "条件に近い制度を案内する診断導線を確認します。",
  },
  {
    href: "/map",
    title: "都道府県マップ",
    desc: "都道府県別の検索導線を確認します。",
  },
  {
    href: "/articles",
    title: "記事・コラム",
    desc: "SEO記事の一覧・詳細ページを確認します。",
  },
  {
    href: "/news",
    title: "ニュース",
    desc: "ニュース記事の一覧・詳細ページを確認します。",
  },
  {
    href: "/newsletter",
    title: "メールマガジン",
    desc: "メール登録フォームの導線を確認します。",
  },
  {
    href: "/line",
    title: "LINE連携",
    desc: "LINE公式アカウントへの導線を確認します。",
  },
];

export default function AdminPage() {
  const resendReady = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
  const geminiReady = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_SEARCH_API_KEY);
  const adminAuthReady = Boolean(process.env.ADMIN_PASSWORD);
  const dataSource = getDataSourceStatus();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">管理者向け</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">デジじゅう管理画面</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          掲載候補、フォーム導線、送信環境、広告・PR相談導線を確認する運用ダッシュボードです。
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs text-gray-500">掲載制度</p>
          <p className="mt-2 text-3xl font-bold text-navy">{municipalities.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs text-gray-500">自動検知候補</p>
          <p className="mt-2 text-3xl font-bold text-navy">{detectedMunicipalities.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs text-gray-500">メール送信</p>
          <p className={`mt-2 text-lg font-bold ${resendReady ? "text-green-700" : "text-amber-700"}`}>
            {resendReady ? "設定済み" : "未設定"}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs text-gray-500">有効PR枠</p>
          <p className="mt-2 text-3xl font-bold text-navy">
            {promotions.filter((promotion) => promotion.active).length}
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-bold text-navy">環境設定</h2>
        <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
          <p className={resendReady ? "text-green-700" : "text-amber-700"}>
            メール送信: {resendReady ? "RESEND_API_KEY / CONTACT_TO_EMAIL 設定済み" : "未設定"}
          </p>
          <p className={geminiReady ? "text-green-700" : "text-amber-700"}>
            自動検知API: {geminiReady ? "Gemini / Google APIキー設定済み" : "未設定"}
          </p>
          <p className={adminAuthReady ? "text-green-700" : "text-amber-700"}>
            管理画面認証: {adminAuthReady ? "ADMIN_PASSWORD 設定済み" : "未設定"}
          </p>
          <p className={dataSource.configured.googleSheets ? "text-green-700" : "text-amber-700"}>
            Google Sheets: {dataSource.configured.googleSheets ? "GOOGLE_SHEETS_CSV_URL 設定済み" : "未設定"}
          </p>
          <p className={dataSource.configured.supabase ? "text-green-700" : "text-amber-700"}>
            Supabase: {dataSource.configured.supabase ? "SUPABASE_URL / SUPABASE_ANON_KEY 設定済み" : "未設定"}
          </p>
          <p className="text-gray-600">
            現在のデータ取得元: {dataSource.activeSource}
          </p>
        </div>
      </div>

      <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-bold text-amber-950">公開前の運用チェック</h2>
        <div className="mt-3 grid gap-2 text-sm leading-relaxed text-amber-900 md:grid-cols-2">
          <p>・`RESEND_API_KEY` と `CONTACT_TO_EMAIL` をVercelに設定</p>
          <p>・`ADMIN_PASSWORD` を設定し、管理画面をBasic認証で保護</p>
          <p>・掲載依頼は公式URLと制度名を確認してから反映</p>
          <p>・広告掲載時は広告/PR表記を明確にする</p>
          <p>・自動検知候補はそのまま公開せず、人の確認を挟む</p>
          <p>・外部データ接続後は `/api/municipalities` で取得件数を確認</p>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {operations.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-orange-300 hover:shadow-md"
          >
            <h2 className="font-bold text-navy">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
            <p className="mt-4 text-sm font-semibold text-orange-600">確認する →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import AdminClient from "./AdminClient";
import { getProgramChecks } from "@/lib/programChecks";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "管理者ページ｜デジじゅう",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const report = await getProgramChecks();
  const checks = Object.entries(report.checks);
  const stale = !report.completedAt || Date.now() - Date.parse(report.completedAt) > 48 * 3600000;
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-navy mb-2">管理者ページ</h1>
      <p className="text-sm text-gray-500 mb-8">データの手動更新・確認ができます。</p>
      <AdminClient />
      <section className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="font-bold">公式ページの自動調査</h2>
        <p className="mt-2 text-sm">最終実行: {report.completedAt ? new Date(report.completedAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }) : "未実施"}</p>
        {stale && <p className="mt-2 text-sm text-red-700">日次調査が未実施、または48時間以上更新されていません。</p>}
        <p className="mt-2 text-sm">取得失敗: {checks.filter(([, c]) => c.result === "failed").length}件 / 内容変更: {checks.filter(([, c]) => c.changed).length}件</p>
        <ul className="mt-3 space-y-2 text-sm">
          {checks.filter(([, c]) => c.result === "failed" || c.changed).map(([id, c]) => <li key={id}><a href={`/municipalities/${id}`} className="text-blue-700 underline">{id}</a>: {c.error || "公式ページの内容変更を確認してください"}</li>)}
        </ul>
        <a href="https://github.com/nicehisa/degi-juu/actions/workflows/check-published-programs.yml" target="_blank" rel="noopener noreferrer" className="mt-4 block text-sm text-blue-700 underline">日次調査の実行履歴・手動実行</a>
        <a href="/admin/detected" className="mt-3 block text-sm text-blue-700 underline">新規制度の検索状況・候補を確認</a>
      </section>
    </div>
  );
}

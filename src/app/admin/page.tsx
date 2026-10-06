import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "管理者ページ｜デジじゅう",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-navy mb-2">管理者ページ</h1>
      <p className="text-sm text-gray-500 mb-8">データの手動更新・確認ができます。</p>
      <AdminClient />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { updateLogs } from "@/data/updates";

export const metadata: Metadata = {
  title: "更新履歴｜デジじゅう",
  description: "デジじゅうの掲載情報、機能追加、注意喚起の更新履歴を確認できます。",
};

export default function UpdatesPage() {
  const logs = [...updateLogs].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-700">運用透明性</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">更新履歴</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          掲載情報や機能追加の履歴を公開しています。制度の価格・特典・販売状況は変更されるため、最終確認は公式ページで行ってください。
        </p>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <article key={log.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <time className="text-sm font-semibold text-gray-700">{log.date}</time>
              <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                {log.category}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-bold text-navy">{log.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{log.description}</p>
            {log.href && (
              <Link href={log.href} className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700">
                関連ページを見る →
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

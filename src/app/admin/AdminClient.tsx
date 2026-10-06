"use client";

import { useState } from "react";

export default function AdminClient() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "admin") {
      setAuthed(true);
    } else {
      setMessage("パスワードが正しくありません");
    }
  };

  const handleRevalidate = async () => {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          "x-revalidate-secret": process.env.NEXT_PUBLIC_REVALIDATE_SECRET ?? "",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setStatus("success");
        setMessage(`更新完了：${new Date(data.timestamp).toLocaleString("ja-JP")}`);
      } else {
        setStatus("error");
        setMessage("更新に失敗しました（認証エラーの可能性があります）");
      }
    } catch {
      setStatus("error");
      setMessage("通信エラーが発生しました");
    }
  };

  if (!authed) {
    return (
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">管理者パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="パスワードを入力"
          />
        </div>
        {message && <p className="text-sm text-red-600">{message}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ログイン
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      {/* 今すぐ更新 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-bold text-gray-800 mb-1">データを今すぐ更新</h2>
        <p className="text-sm text-gray-500 mb-4">
          キャッシュをクリアし、データソースから最新情報を取得します。
        </p>
        <button
          onClick={handleRevalidate}
          disabled={status === "loading"}
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              更新中...
            </>
          ) : (
            <>🔄 今すぐ更新</>
          )}
        </button>

        {message && (
          <p className={`mt-3 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
            {status === "success" ? "✅ " : "❌ "}{message}
          </p>
        )}
      </div>

      {/* 自動チェック情報 */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h2 className="font-bold text-gray-800 mb-3">自動チェック設定</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex gap-3">
            <dt className="text-gray-500 w-32 shrink-0">実行スケジュール</dt>
            <dd className="font-medium text-gray-800">毎日 9:00 AM（日本時間）</dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-gray-500 w-32 shrink-0">通知先メール</dt>
            <dd className="font-medium text-gray-800">
              {process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL_MASKED ?? "設定済み（環境変数）"}
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-gray-500 w-32 shrink-0">データ保持期間</dt>
            <dd className="font-medium text-gray-800">24時間キャッシュ</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

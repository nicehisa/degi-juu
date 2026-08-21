"use client";

import { useState } from "react";

const CONTACT_FALLBACK_EMAIL = "info@fortitudejapan.com";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "pending" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // await後は event.currentTarget が null になるため、ここで参照を確保しておく
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setErrors([]);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          interest: formData.get("interest"),
          consent: formData.get("consent") === "on",
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        setErrors(data?.errors || ["登録できませんでした。時間をおいて再度お試しください。"]);
        setStatus("error");
        return;
      }

      form.reset();
      // ok:true でもメール通知が飛んでいない場合がある（Resend未設定・送信失敗）
      setStatus(data.delivered === false ? "pending" : "success");
    } catch {
      setErrors(["通信に失敗しました。通信環境をご確認のうえ、再度お試しください。"]);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "success" && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          登録を受け付けました。配信準備が整い次第、地域制度の更新情報をお届けします。
        </div>
      )}
      {status === "pending" && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
          登録を受け付けました。ただし通知メールの送信が完了していない可能性があります。
          確認が必要な場合は
          <a href={`mailto:${CONTACT_FALLBACK_EMAIL}`} className="mx-1 font-semibold underline">
            {CONTACT_FALLBACK_EMAIL}
          </a>
          までご連絡ください。
        </div>
      )}
      {errors.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-gray-700">メールアドレス</span>
        <input name="email" type="email" required maxLength={254} className={inputClass} placeholder="example@email.com" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-gray-700">関心テーマ</span>
        <select name="interest" className={inputClass}>
          <option value="new-programs">新しいデジタル住民制度</option>
          <option value="benefits">特典・イベント情報</option>
          <option value="municipality-dx">自治体DX・関係人口施策</option>
          <option value="listing">掲載・広告PRについて</option>
        </select>
      </label>

      <label className="flex items-start gap-3 text-sm text-gray-700">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            プライバシーポリシー
          </a>
          に同意します。
        </span>
      </label>

      <p className="text-xs leading-relaxed text-gray-500">
        配信停止は、配信メール本文のリンク、または
        <a href={`mailto:${CONTACT_FALLBACK_EMAIL}`} className="mx-0.5 underline">
          {CONTACT_FALLBACK_EMAIL}
        </a>
        へのご連絡でいつでも行えます。
      </p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-orange-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "送信中..." : "メールで更新情報を受け取る"}
      </button>
    </form>
  );
}

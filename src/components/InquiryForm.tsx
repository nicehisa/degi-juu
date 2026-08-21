"use client";

import { useState } from "react";
import type { InquiryKind } from "@/lib/inquiry";

type Props = {
  kind: InquiryKind;
};

const kindConfig = {
  contact: {
    title: "お問い合わせありがとうございます",
    description: "内容を確認し、必要に応じてご連絡します。",
    submit: "問い合わせを送信する",
  },
  listing: {
    title: "掲載依頼を受け付けました",
    description: "公式情報を確認したうえで、掲載可否と内容を確認します。",
    submit: "掲載依頼を送信する",
  },
  advertising: {
    title: "広告・PR相談を受け付けました",
    description: "媒体方針と掲載可否を確認し、折り返しご連絡します。",
    submit: "広告・PR相談を送信する",
  },
};

const CONTACT_FALLBACK_EMAIL = "info@fortitudejapan.com";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";

export default function InquiryForm({ kind }: Props) {
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [delivered, setDelivered] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const config = kindConfig[kind];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          kind,
          agreed,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setErrors(data.errors || ["送信に失敗しました。"]);
        return;
      }

      // ok:true でもメール配信されていない場合がある（Resend未設定・送信失敗）。
      // その場合は受付だけ伝えて、直接連絡先も案内する。
      setDelivered(data.delivered !== false);
      setSubmitted(true);
    } catch {
      setErrors(["送信に失敗しました。通信環境をご確認ください。"]);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    if (!delivered) {
      return (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-6">
          <p className="text-lg font-bold text-amber-900">送信内容を受け付けました</p>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">
            ただし、メール自動送信が完了していない可能性があります。
            お急ぎの場合、または数日たっても返信がない場合は、お手数ですが
            <a href={`mailto:${CONTACT_FALLBACK_EMAIL}`} className="mx-1 font-semibold underline">
              {CONTACT_FALLBACK_EMAIL}
            </a>
            まで直接ご連絡ください。
          </p>
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-lg font-bold text-green-800">{config.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-green-700">{config.description}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input name="name" type="text" required className={inputClass} placeholder="山田 太郎" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input name="email" type="email" required className={inputClass} placeholder="example@email.com" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            会社名・団体名{kind !== "contact" && <span className="text-red-500"> *</span>}
          </label>
          <input
            name="organization"
            type="text"
            required={kind !== "contact"}
            className={inputClass}
            placeholder="例：○○市、株式会社○○"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">役職・担当</label>
          <input name="role" type="text" className={inputClass} placeholder="例：企画課、広報担当" />
        </div>
      </div>

      {kind === "listing" && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">都道府県</label>
              <input name="prefecture" type="text" className={inputClass} placeholder="例：山形県" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">自治体名</label>
              <input name="municipality" type="text" className={inputClass} placeholder="例：○○市" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              制度名 <span className="text-red-500">*</span>
            </label>
            <input name="programName" type="text" required className={inputClass} placeholder="例：○○市デジタル住民票" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              公式ページURL <span className="text-red-500">*</span>
            </label>
            <input name="targetUrl" type="url" required className={inputClass} placeholder="https://" />
          </div>
        </>
      )}

      {kind === "advertising" && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">想定予算</label>
            <select name="budget" className={inputClass}>
              <option value="">選択してください</option>
              <option value="10万円未満">10万円未満</option>
              <option value="10〜30万円">10〜30万円</option>
              <option value="30〜50万円">30〜50万円</option>
              <option value="50万円以上">50万円以上</option>
              <option value="未定">未定</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">掲載希望時期</label>
            <input name="preferredStart" type="text" className={inputClass} placeholder="例：2026年9月頃" />
          </div>
        </div>
      )}

      {kind !== "listing" && (
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">対象URL（任意）</label>
          <input name="targetUrl" type="url" className={inputClass} placeholder="https://" />
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={7}
          className={`${inputClass} resize-y`}
          placeholder="確認したい内容、掲載したい情報、PRしたい内容をご記入ください"
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-400"
          />
          <span className="text-xs leading-relaxed text-gray-700">
            <a href="/privacy" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              プライバシーポリシー
            </a>
            に同意します。入力情報はお問い合わせ対応、掲載可否の確認、広告・PR相談への回答に使用します。
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={!agreed || submitting}
        className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "送信中..." : config.submit}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">📩</div>
        <p className="font-bold text-blue-800 mb-2">お問い合わせありがとうございます</p>
        <p className="text-sm text-blue-700">
          現在、送信機能は実装準備中です。
          お急ぎの場合は、直接各自治体の公式ページをご確認ください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          種別 <span className="text-red-500">*</span>
        </label>
        <select
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">選択してください</option>
          <option value="listing">掲載依頼</option>
          <option value="correction">修正依頼</option>
          <option value="ad">広告・PR掲載相談</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          対象自治体名（任意）
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="例：○○市、○○町"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          対象URL（任意）
        </label>
        <input
          type="url"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="https://"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={6}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          placeholder="お問い合わせ内容をご記入ください"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
          />
          <span className="text-xs text-gray-700 leading-relaxed">
            <a href="/privacy" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              プライバシーポリシー
            </a>
            に同意します。入力いただいた情報は、お問い合わせへの対応・掲載情報の更新にのみ使用します。
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={!agreed}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        送信する
      </button>

      <p className="text-xs text-gray-500 text-center">
        ※ 現在、送信機能は実装準備中です。内容を確認次第ご連絡します。
      </p>
    </form>
  );
}

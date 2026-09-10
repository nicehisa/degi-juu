"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/regions", label: "地域を探す" },
  { href: "/compare", label: "制度を比較" },
  { href: "/about", label: "はじめての方へ" },
  { href: "/faq", label: "よくある質問" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="bg-amber-50 border-b border-amber-200">
        <p className="max-w-6xl mx-auto px-4 py-2 text-xs sm:text-sm text-amber-900 leading-relaxed">
          地域応援の制度を紹介する民間サイトです。参加・購入は各公式サイトで行います。
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" aria-label="デジじゅう-好きなまちとつながる、デジタル住民票紹介サイト トップへ" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 shrink-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white font-bold">デ</span>
            <span>
              <span className="block text-xl font-bold text-navy leading-none">デジじゅう<span className="hidden sm:inline">-</span></span>
              <span className="hidden sm:block text-xs text-gray-600 mt-1">好きなまちとつながる、デジタル住民票紹介サイト</span>
            </span>
          </Link>
          <nav aria-label="メインメニュー" className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700">{item.label}</Link>
            ))}
            <Link href="/municipalities" className="ml-2 inline-flex min-h-11 items-center rounded-lg bg-orange-500 px-4 text-sm font-bold text-white hover:bg-orange-600">制度一覧を見る</Link>
          </nav>
          <button type="button" className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-gray-200 text-gray-700"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"} aria-expanded={menuOpen} aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}>
            <span aria-hidden="true" className="text-2xl">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
        {menuOpen && (
          <nav id="mobile-menu" aria-label="モバイルメニュー" className="lg:hidden max-h-[65vh] overflow-y-auto border-t border-gray-100 py-3" onKeyDown={e => { if (e.key === "Escape") setMenuOpen(false); }}>
            {[...navItems, {href: "/municipalities", label: "制度一覧を見る"}, {href: "/contact", label: "お問い合わせ"}].map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center rounded-lg px-4 py-3 text-base text-gray-700 hover:bg-orange-50">{item.label}</Link>
            ))}
            <p className="px-4 pt-3 text-xs text-gray-500">自治体・事業者の方へ</p>
            <Link href="/listing-request" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-blue-700">掲載依頼・情報提供</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

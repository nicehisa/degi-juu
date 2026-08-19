"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/municipalities", label: "自治体一覧" },
  { href: "/regions", label: "地域から探す" },
  { href: "/benefits", label: "特典から探す" },
  { href: "/types", label: "制度タイプ" },
  { href: "/diagnosis", label: "診断" },
  { href: "/advertise", label: "広告・PR" },
  {
    label: "ガイド・注意事項",
    children: [
      { href: "/about", label: "デジタル住民制度とは" },
      { href: "/difference", label: "ふるさと納税との違い" },
      { href: "/compare", label: "制度を比較する" },
      { href: "/map", label: "都道府県マップ" },
      { href: "/ranking", label: "比較しやすい制度" },
      { href: "/articles", label: "記事・コラム" },
      { href: "/news", label: "ニュース" },
      { href: "/newsletter", label: "メールマガジン" },
      { href: "/line", label: "LINE連携" },
      { href: "/faq", label: "よくある質問" },
      { href: "/updates", label: "更新履歴" },
      { href: "/company", label: "運営会社" },
      { href: "/editorial-policy", label: "掲載基準・編集方針" },
      { href: "/legal", label: "注意事項・免責事項" },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-2 text-[11px] sm:text-xs text-amber-900 leading-relaxed">
          本サイトは自治体公式サイトではありません。法律上の住民票・住民登録・ふるさと納税とは異なります。
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white font-bold">
              デ
            </span>
            <span>
              <span className="block text-xl font-bold text-navy leading-none">デジじゅう</span>
              <span className="hidden sm:block text-[11px] text-gray-500 mt-1">地域と特典から探すデジタル住民制度</span>
            </span>
            <span className="hidden sm:inline text-xs text-gray-500 border border-gray-300 rounded px-1.5 py-0.5">β版</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) =>
              "children" in item ? (
                <div key={item.label} className="relative">
                  <button
                    className="px-3 py-2 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors flex items-center gap-1"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.label}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-max z-50"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/listing-request"
              className="ml-2 inline-flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
            >
              掲載依頼
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="xl:hidden p-2 rounded-md text-gray-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニューを開く"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="xl:hidden pb-4 border-t border-gray-100 mt-1 pt-2">
            {navItems.map((item) =>
              "children" in item ? (
                <div key={item.label}>
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {item.label}
                  </p>
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-2.5 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/listing-request"
              className="mt-2 block rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              掲載依頼
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

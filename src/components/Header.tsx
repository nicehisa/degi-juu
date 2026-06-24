"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "トップ" },
  { href: "/municipalities", label: "自治体一覧" },
  {
    label: "探す",
    children: [
      { href: "/regions", label: "🗾 地域から探す" },
      { href: "/benefits", label: "🎁 特典から探す" },
      { href: "/types", label: "🪙 制度タイプから探す" },
      { href: "/compare", label: "📊 比較する" },
    ],
  },
  {
    label: "ガイド",
    children: [
      { href: "/about", label: "デジタル住民制度とは" },
      { href: "/difference", label: "ふるさと納税との違い" },
    ],
  },
  { href: "/legal", label: "注意事項" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold text-blue-700">デジじゅう</span>
            <span className="hidden sm:inline text-xs text-gray-500 border border-gray-300 rounded px-1.5 py-0.5">β版</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
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
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-700 hover:bg-blue-50"
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
          <nav className="lg:hidden pb-4 border-t border-gray-100 mt-1 pt-2">
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
          </nav>
        )}
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "デジじゅう｜全国のデジタル住民票・デジタル住民NFTを探せる比較サイト",
  description:
    "デジじゅうは、全国のデジタル住民票、デジタル住民NFT、デジタル住民証、地域ファン向け会員証を自治体・特典・価格から比較できる情報サイトです。",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    siteName: "デジじゅう",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import path from "node:path";
import type { NextConfig } from "next";

const securityHeaders = [
  // クリックジャッキング防止
  { key: "X-Frame-Options", value: "DENY" },
  // MIMEスニッフィング防止
  { key: "X-Content-Type-Options", value: "nosniff" },
  // XSS保護（モダンブラウザ向け）
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // リファラー情報の制限
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // HTTPS強制（1年間）
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // 不要なブラウザ機能を無効化
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // コンテンツセキュリティポリシー
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.jsのハイドレーションに必要
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  // 親ディレクトリのlockfileをワークスペースルートと誤検出させないための固定
  outputFileTracingRoot: path.join(__dirname),
  // 外部ホストの画像を使う際は、許諾確認後に images.remotePatterns へ追加する。
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // 親ディレクトリのlockfileをワークスペースルートと誤検出させないための固定
  outputFileTracingRoot: path.join(__dirname),
  // 外部ホストの画像を使う際は、許諾確認後に images.remotePatterns へ追加する。
};

export default nextConfig;

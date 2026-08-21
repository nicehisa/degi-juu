import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // 親ディレクトリのlockfileをワークスペースルートと誤検出させないための固定
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.town.nishikawa.yamagata.jp" },
      { protocol: "https", hostname: "www2.city.mine.lg.jp" },
      { protocol: "https", hostname: "www.city.sosa.lg.jp" },
      { protocol: "https", hostname: "www.akitakata.jp" },
      { protocol: "https", hostname: "www.city.habikino.lg.jp" },
      { protocol: "https", hostname: "www.town.ibaraki-yachiyo.lg.jp" },
      { protocol: "https", hostname: "www.kumakogen.jp" },
      { protocol: "https", hostname: "www.town.bandai.fukushima.jp" },
      { protocol: "https", hostname: "www.city.saga-kashima.lg.jp" },
      { protocol: "https", hostname: "www.town.nachikatsuura.wakayama.jp" },
      { protocol: "https", hostname: "www.city.uda.lg.jp" },
      { protocol: "https", hostname: "www.city.joyo.kyoto.jp" },
      { protocol: "https", hostname: "www.town.kamigori.hyogo.jp" },
      { protocol: "https", hostname: "www.town.mashiko.lg.jp" },
      { protocol: "https", hostname: "www.city.otsuki.yamanashi.jp" },
      { protocol: "https", hostname: "www.town.fujikawa.yamanashi.jp" },
      { protocol: "https", hostname: "www.city.toyama.lg.jp" },
      { protocol: "https", hostname: "www.city.ishioka.lg.jp" },
      { protocol: "https", hostname: "www.town.ogawa.saitama.jp" },
    ],
  },
};

export default nextConfig;

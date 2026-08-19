import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fff7ed 0%, #eff6ff 48%, #ecfdf5 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#ea580c", fontSize: 32, fontWeight: 700 }}>デジじゅう</div>
        <div
          style={{
            marginTop: 28,
            color: "#13233f",
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.18,
          }}
        >
          <span>デジタル住民制度を</span>
          <span>地域・特典から探す</span>
        </div>
        <div style={{ marginTop: 32, color: "#475569", fontSize: 28, lineHeight: 1.5 }}>
          法律上の住民票・住民登録・ふるさと納税とは異なります。
        </div>
      </div>
    ),
    size
  );
}

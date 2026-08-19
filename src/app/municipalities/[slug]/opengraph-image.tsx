import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { municipalities } from "@/data/municipalities";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return municipalities.map((municipality) => ({ slug: municipality.slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const municipality = municipalities.find((item) => item.slug === slug);
  if (!municipality) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fff7ed 0%, #eff6ff 55%, #f8fafc 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#ea580c", fontSize: 28, fontWeight: 700 }}>デジじゅう</div>
        <div
          style={{
            marginTop: 22,
            color: "#13233f",
            display: "flex",
            flexDirection: "column",
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.15,
          }}
        >
          <span>{municipality.municipality}</span>
          <span>{municipality.programName}</span>
        </div>
        <div style={{ marginTop: 28, display: "flex", gap: 16, color: "#334155", fontSize: 26 }}>
          <span>{municipality.prefecture}</span>
          <span>{municipality.type}</span>
          <span>{municipality.status}</span>
        </div>
        <div style={{ marginTop: 28, color: "#92400e", fontSize: 22 }}>
          法律上の住民票ではありません。最新情報は公式ページでご確認ください。
        </div>
      </div>
    ),
    size
  );
}

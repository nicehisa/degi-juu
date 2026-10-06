import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getMunicipalities } from "@/lib/dataSource";
import { sendNotificationEmail } from "@/lib/sendNotificationEmail";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Vercel Cron は Authorization: Bearer <CRON_SECRET> を付与する
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const municipalities = await getMunicipalities();
  const checkedAt = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

  // キャッシュを再検証して最新データを反映
  revalidatePath("/");
  revalidatePath("/municipalities");
  revalidatePath("/regions");
  revalidatePath("/benefits");
  revalidatePath("/types");

  await sendNotificationEmail({
    subject: `【デジじゅう】データ確認レポート（${checkedAt}）`,
    municipalityCount: municipalities.length,
    newMunicipalities: [], // Supabase 連携後に差分検出ロジックを追加
    checkedAt,
    triggeredBy: "cron",
  });

  console.log(`[cron] check-updates completed: ${municipalities.length} municipalities at ${checkedAt}`);

  return NextResponse.json({
    ok: true,
    municipalityCount: municipalities.length,
    checkedAt,
  });
}

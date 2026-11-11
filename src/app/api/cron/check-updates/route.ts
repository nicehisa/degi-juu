import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getMunicipalities } from "@/lib/dataSource";
import { sendNotificationEmail } from "@/lib/sendNotificationEmail";
import { getProgramChecks } from "@/lib/programChecks";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Vercel Cron は Authorization: Bearer <CRON_SECRET> を付与する
  const authHeader = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const municipalities = await getMunicipalities();
  revalidateTag("program-checks");
  const report = await getProgramChecks(true);
  const overdue = !report.completedAt || Date.now() - Date.parse(report.completedAt) > 48 * 3600000;
  const failedCount = Object.values(report.checks).filter(c => c.result === "failed").length;
  const changedCount = Object.values(report.checks).filter(c => c.changed).length;
  const checkedAt = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

  // キャッシュを再検証して最新データを反映
  revalidatePath("/", "layout");
  revalidatePath("/municipalities");
  revalidatePath("/regions");
  revalidatePath("/benefits");
  revalidatePath("/types");

  await sendNotificationEmail({
    subject: `【デジじゅう】自動調査: ${overdue ? "更新遅延" : `取得失敗${failedCount}件・変更${changedCount}件`}（${checkedAt}）`,
    municipalityCount: municipalities.length,
    newMunicipalities: [], // Supabase 連携後に差分検出ロジックを追加
    checkedAt,
    reportSummary: `公式ページ調査完了: ${report.completedAt || "未実施"} / 取得失敗: ${failedCount}件 / 変更あり: ${changedCount}件`,
    triggeredBy: "cron",
  });

  console.log(`[cron] check-updates completed: ${municipalities.length} municipalities at ${checkedAt}`);

  return NextResponse.json({
    ok: !overdue && failedCount === 0,
    reportCompletedAt: report.completedAt,
    overdue,
    failedCount,
    changedCount,
    municipalityCount: municipalities.length,
    checkedAt,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getProgramChecks } from "@/lib/programChecks";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const correct = process.env.ADMIN_PASSWORD;

  if (!correct || password !== correct) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag("program-checks");
  const report = await getProgramChecks(true);
  revalidatePath("/", "layout");
  revalidatePath("/municipalities");
  revalidatePath("/regions");
  revalidatePath("/benefits");
  revalidatePath("/types");

  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString(), checkedAt: report.completedAt });
}

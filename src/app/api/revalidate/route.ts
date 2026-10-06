import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/municipalities");
  revalidatePath("/regions");
  revalidatePath("/benefits");
  revalidatePath("/types");

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
  });
}

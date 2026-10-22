import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const correct = process.env.ADMIN_PASSWORD ?? "admin";

  if (password !== correct) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/municipalities");
  revalidatePath("/regions");
  revalidatePath("/benefits");
  revalidatePath("/types");

  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
}

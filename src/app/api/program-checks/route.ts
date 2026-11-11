import { NextResponse } from "next/server";
import { getProgramChecks } from "@/lib/programChecks";

export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json(await getProgramChecks(), { headers: { "Cache-Control": "no-store" } });
}

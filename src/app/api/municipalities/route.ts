import { NextResponse } from "next/server";
import { getDataSourceStatus, getMunicipalities } from "@/lib/dataSource";

export async function GET() {
  const data = await getMunicipalities();
  return NextResponse.json({
    ok: true,
    source: getDataSourceStatus(),
    count: data.length,
    data,
  });
}

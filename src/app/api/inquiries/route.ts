import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/sendInquiryEmail";
import { validateInquiryPayload, type InquiryPayload } from "@/lib/inquiry";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<InquiryPayload>;
    const errors = validateInquiryPayload(payload);

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const result = await sendInquiryEmail(payload as InquiryPayload);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        errors: ["送信に失敗しました。時間をおいて再度お試しください。"],
      },
      { status: 500 }
    );
  }
}

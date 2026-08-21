import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/sendInquiryEmail";
import { validateInquiryPayload, type InquiryPayload } from "@/lib/inquiry";
import { logInquiryFallback } from "@/lib/inquiryLog";
import { checkRateLimit, getClientIp, isOversizedBody } from "@/lib/rateLimit";

const MAX_BODY_BYTES = 32 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  if (isOversizedBody(request, MAX_BODY_BYTES)) {
    return NextResponse.json(
      { ok: false, errors: ["送信内容が大きすぎます。内容を短くしてお試しください。"] },
      { status: 413 }
    );
  }

  const limit = checkRateLimit(`inquiry:${getClientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, errors: ["送信回数の上限に達しました。しばらく時間をおいてからお試しください。"] },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let payload: Partial<InquiryPayload>;
  try {
    payload = (await request.json()) as Partial<InquiryPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["送信内容を読み取れませんでした。再度お試しください。"] },
      { status: 400 }
    );
  }

  const errors = validateInquiryPayload(payload);
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  try {
    const result = await sendInquiryEmail(payload as InquiryPayload);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    // sendInquiryEmail内で拾えなかった想定外の例外でも、内容だけは必ず残す
    logInquiryFallback("resend-send-failed", payload.kind || "unknown", { ...payload }, error);
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        fallback: "resend-send-failed",
      },
      { status: 200 }
    );
  }
}

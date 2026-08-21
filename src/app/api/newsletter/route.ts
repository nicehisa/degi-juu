import { NextResponse } from "next/server";
import {
  sendNewsletterSignup,
  validateNewsletterPayload,
  type NewsletterPayload,
} from "@/lib/newsletter";
import { logInquiryFallback } from "@/lib/inquiryLog";
import { checkRateLimit, getClientIp, isOversizedBody } from "@/lib/rateLimit";

const MAX_BODY_BYTES = 4 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  if (isOversizedBody(request, MAX_BODY_BYTES)) {
    return NextResponse.json(
      { ok: false, errors: ["送信内容が大きすぎます。"] },
      { status: 413 }
    );
  }

  const limit = checkRateLimit(`newsletter:${getClientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, errors: ["登録回数の上限に達しました。しばらく時間をおいてからお試しください。"] },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let payload: Partial<NewsletterPayload>;
  try {
    payload = (await request.json()) as Partial<NewsletterPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["送信内容を読み取れませんでした。再度お試しください。"] },
      { status: 400 }
    );
  }

  const errors = validateNewsletterPayload(payload);
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  try {
    const result = await sendNewsletterSignup(payload as NewsletterPayload);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    logInquiryFallback("resend-send-failed", "newsletter", { ...payload }, error);
    return NextResponse.json({ ok: true, delivered: false, fallback: "resend-send-failed" });
  }
}

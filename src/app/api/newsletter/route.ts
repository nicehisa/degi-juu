import { NextResponse } from "next/server";
import {
  sendNewsletterSignup,
  validateNewsletterPayload,
  type NewsletterPayload,
} from "@/lib/newsletter";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<NewsletterPayload>;
    const errors = validateNewsletterPayload(payload);

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const result = await sendNewsletterSignup(payload as NewsletterPayload);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, errors: ["登録処理中にエラーが発生しました。時間をおいて再度お試しください。"] },
      { status: 500 }
    );
  }
}

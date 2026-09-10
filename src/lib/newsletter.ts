import { logInquiryFallback } from "@/lib/inquiryLog";

export type NewsletterPayload = {
  email: string;
  interest?: string;
  consent: boolean;
};

export type NewsletterResult = {
  delivered: boolean;
  fallback?: "resend-not-configured" | "resend-send-failed";
};

const INTEREST_VALUES = ["new-programs", "benefits", "municipality-dx", "listing"];

export function validateNewsletterPayload(payload: unknown) {
  const errors: string[] = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return ["送信内容の形式が正しくありません。"];
  }
  const input = payload as Partial<NewsletterPayload>;

  if (typeof input.email !== "string" || !input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push("有効なメールアドレスを入力してください。");
  } else if (input.email.length > 254) {
    errors.push("メールアドレスが長すぎます。");
  }

  if (input.interest !== undefined && (typeof input.interest !== "string" || (input.interest !== "" && !INTEREST_VALUES.includes(input.interest)))) {
    errors.push("関心テーマの選択内容が不正です。");
  }

  if (input.consent !== true) {
    errors.push("プライバシーポリシーへの同意が必要です。");
  }

  return errors;
}

export async function sendNewsletterSignup(payload: NewsletterPayload): Promise<NewsletterResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "デジじゅう <onboarding@resend.dev>";

  // 未設定・送信失敗のどちらでも登録内容を失わないよう、必ずログへ退避する。
  if (!apiKey || !to) {
    await logInquiryFallback("resend-not-configured", "newsletter", { ...payload });
    return { delivered: false, fallback: "resend-not-configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: "【デジじゅう】メールマガジン登録",
        text: [
          "メールマガジン登録がありました。",
          "",
          `メール: ${payload.email}`,
          `関心テーマ: ${payload.interest || "未選択"}`,
          `同意取得日時: ${new Date().toISOString()}`,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Resend failed: ${response.status} ${text.slice(0, 500)}`);
    }
  } catch (error) {
    await logInquiryFallback("resend-send-failed", "newsletter", { ...payload }, error);
    return { delivered: false, fallback: "resend-send-failed" };
  }

  return { delivered: true };
}

export type NewsletterPayload = {
  email: string;
  interest?: string;
  consent: boolean;
};

export function validateNewsletterPayload(payload: Partial<NewsletterPayload>) {
  const errors: string[] = [];

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.push("有効なメールアドレスを入力してください。");
  }

  if (!payload.consent) {
    errors.push("プライバシーポリシーへの同意が必要です。");
  }

  return errors;
}

export async function sendNewsletterSignup(payload: NewsletterPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "デジじゅう <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY and CONTACT_TO_EMAIL are required in production.");
    }

    return { delivered: false, skipped: true };
  }

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
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend failed: ${response.status} ${text.slice(0, 500)}`);
  }

  return { delivered: true, skipped: false };
}

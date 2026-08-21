import { formatInquiryEmail, inquiryKindLabels, type InquiryPayload } from "@/lib/inquiry";
import { logInquiryFallback } from "@/lib/inquiryLog";

export type SendResult = {
  delivered: boolean;
  id?: string;
  autoReplyId?: string;
  /** 未配信のとき、その理由。UIの案内文の出し分けに使う。 */
  fallback?: "resend-not-configured" | "resend-send-failed";
};

async function sendResendEmail(apiKey: string, body: Record<string, unknown>) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend failed: ${response.status} ${text.slice(0, 500)}`);
  }

  return response.json();
}

export async function sendInquiryEmail(payload: InquiryPayload): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "デジじゅう <onboarding@resend.dev>";

  // 未設定でもエラーにせず、内容をログへ退避してから未配信として返す。
  // 500を返して終わると問い合わせ内容がどこにも残らないため。
  if (!apiKey || !to) {
    logInquiryFallback("resend-not-configured", payload.kind, { ...payload });
    return { delivered: false, fallback: "resend-not-configured" };
  }

  const subject = `【デジじゅう】${inquiryKindLabels[payload.kind]}: ${payload.organization || payload.name}`;
  const text = formatInquiryEmail(payload);

  let data: { id?: string };
  try {
    data = await sendResendEmail(apiKey, {
      from,
      to,
      reply_to: payload.email,
      subject,
      text,
    });
  } catch (error) {
    logInquiryFallback("resend-send-failed", payload.kind, { ...payload }, error);
    return { delivered: false, fallback: "resend-send-failed" };
  }

  let autoReplyId: string | undefined;
  if (process.env.CONTACT_AUTO_REPLY !== "false") {
    try {
      const autoReply = await sendResendEmail(apiKey, {
        from,
        to: payload.email,
        subject: "【デジじゅう】お問い合わせを受け付けました",
        text: [
          `${payload.name} 様`,
          "",
          "デジじゅうへお問い合わせいただきありがとうございます。",
          "以下の内容で受け付けました。内容を確認し、必要に応じてご連絡します。",
          "",
          "なお、掲載情報の確認・修正依頼については、公式情報の確認後に対応します。",
          "デジタル住民票等は法律上の住民票や住民登録、ふるさと納税とは異なります。",
          "",
          "--- 送信内容 ---",
          text,
        ].join("\n"),
      });
      autoReplyId = autoReply.id;
    } catch (error) {
      // 管理者宛は届いているので、自動返信の失敗だけで未配信扱いにはしない
      console.error("[degi-juu auto reply failed]", error);
    }
  }

  return { delivered: true, id: data.id, autoReplyId };
}

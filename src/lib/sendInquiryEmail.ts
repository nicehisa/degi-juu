import { formatInquiryEmail, inquiryKindLabels, type InquiryPayload } from "@/lib/inquiry";

type SendResult = {
  delivered: boolean;
  id?: string;
  autoReplyId?: string;
  skipped?: boolean;
};

async function sendResendEmail(apiKey: string, body: Record<string, unknown>) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY and CONTACT_TO_EMAIL are required in production.");
    }

    console.info("[degi-juu inquiry skipped]", {
      kind: payload.kind,
      email: payload.email,
      organization: payload.organization,
    });
    return { delivered: false, skipped: true };
  }

  const subject = `【デジじゅう】${inquiryKindLabels[payload.kind]}: ${payload.organization || payload.name}`;
  const text = formatInquiryEmail(payload);

  const data = await sendResendEmail(apiKey, {
    from,
    to,
    reply_to: payload.email,
    subject,
    text,
  });

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
      console.error("[degi-juu auto reply failed]", error);
    }
  }

  return { delivered: true, id: data.id, autoReplyId };
}

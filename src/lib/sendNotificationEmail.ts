import { Resend } from "resend";

export type NotificationPayload = {
  subject: string;
  municipalityCount: number;
  newMunicipalities: string[];
  checkedAt: string;
  triggeredBy: "cron" | "manual";
};

export async function sendNotificationEmail(payload: NotificationPayload) {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to || !process.env.RESEND_API_KEY) return;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const newSection =
    payload.newMunicipalities.length > 0
      ? `<h2 style="color:#1e40af;">新しく確認された自治体（${payload.newMunicipalities.length}件）</h2>
         <ul>${payload.newMunicipalities.map((n) => `<li>${n}</li>`).join("")}</ul>`
      : `<p style="color:#6b7280;">前回から新しい自治体の追加はありませんでした。</p>`;

  const trigger = payload.triggeredBy === "manual" ? "手動（今すぐ更新）" : "自動（定期チェック）";

  await resend.emails.send({
    from: "デジじゅう <onboarding@resend.dev>",
    to,
    subject: payload.subject,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h1 style="color:#1e2a4a;border-bottom:2px solid #3b82f6;padding-bottom:8px;">
          デジじゅう｜データ確認レポート
        </h1>
        <p style="color:#374151;">確認日時：${payload.checkedAt}</p>
        <p style="color:#374151;">実行方法：${trigger}</p>

        <div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:12px 16px;margin:16px 0;">
          <strong>現在の掲載自治体数：${payload.municipalityCount}件</strong>
        </div>

        ${newSection}

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
        <p style="color:#9ca3af;font-size:12px;">
          このメールはデジじゅうのデータ管理システムから自動送信されています。<br>
          配信停止は管理者ページからお手続きください。
        </p>
      </div>
    `,
  });
}

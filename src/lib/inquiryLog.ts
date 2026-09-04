/**
 * Resendが未設定、または送信に失敗した場合でも問い合わせ内容を失わないための記録先。
 *
 * Vercelのランタイムログに1行JSONで残すことで、
 * ログドレイン／アラート連携から内容を復元できるようにする。
 */
export const INQUIRY_FALLBACK_TAG = "degi-juu:inquiry-fallback";

export type InquiryFallbackReason = "resend-not-configured" | "resend-send-failed";

function getStringValue(payload: Record<string, unknown>, key: string) {
  const value = payload[key];
  return typeof value === "string" && value.trim() ? value.trim() : "未入力";
}

function truncateMessage(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return "未入力";
  return value.trim().slice(0, 200);
}

function formatJstDate(value: Date) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(value);
}

function buildWebhookText(
  reason: InquiryFallbackReason,
  kind: string,
  payload: Record<string, unknown>,
  receivedAt: Date
) {
  return [
    "🚨 デジじゅう: 問い合わせのメール送信に失敗しました",
    `reason: ${reason}`,
    `kind: ${kind}`,
    `受信日時: ${formatJstDate(receivedAt)} JST`,
    `氏名: ${getStringValue(payload, "name")}`,
    `メールアドレス: ${getStringValue(payload, "email")}`,
    `団体名: ${getStringValue(payload, "organization")}`,
    `本文: ${truncateMessage(payload.message)}`,
    "",
    `全文は Vercel Runtime Logs で \`${INQUIRY_FALLBACK_TAG}\` を検索してください。`,
  ].join("\n");
}

async function notifyFallbackWebhook(
  reason: InquiryFallbackReason,
  kind: string,
  payload: Record<string, unknown>,
  receivedAt: Date
) {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: buildWebhookText(reason, kind, payload, receivedAt),
      }),
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Webhook failed: ${response.status} ${text.slice(0, 500)}`);
    }
  } catch (error) {
    console.error("[degi-juu inquiry fallback webhook failed]", error);
  }
}

export async function logInquiryFallback(
  reason: InquiryFallbackReason,
  kind: string,
  payload: Record<string, unknown>,
  error?: unknown
) {
  const receivedAt = new Date();
  const record = {
    tag: INQUIRY_FALLBACK_TAG,
    reason,
    kind,
    receivedAt: receivedAt.toISOString(),
    payload,
    error: error instanceof Error ? error.message : error ? String(error) : undefined,
  };

  // 本文をそのまま残す。障害時の唯一の復旧経路なのでconsole.errorで出す。
  console.error(INQUIRY_FALLBACK_TAG, JSON.stringify(record));
  await notifyFallbackWebhook(reason, kind, payload, receivedAt);
}

/**
 * Resendが未設定、または送信に失敗した場合でも問い合わせ内容を失わないための記録先。
 *
 * Vercelのランタイムログに1行JSONで残すことで、
 * ログドレイン／アラート連携から内容を復元できるようにする。
 */
export const INQUIRY_FALLBACK_TAG = "degi-juu:inquiry-fallback";

export type InquiryFallbackReason = "resend-not-configured" | "resend-send-failed";

export function logInquiryFallback(
  reason: InquiryFallbackReason,
  kind: string,
  payload: Record<string, unknown>,
  error?: unknown
) {
  const record = {
    tag: INQUIRY_FALLBACK_TAG,
    reason,
    kind,
    receivedAt: new Date().toISOString(),
    payload,
    error: error instanceof Error ? error.message : error ? String(error) : undefined,
  };

  // 本文をそのまま残す。障害時の唯一の復旧経路なのでconsole.errorで出す。
  console.error(INQUIRY_FALLBACK_TAG, JSON.stringify(record));
}

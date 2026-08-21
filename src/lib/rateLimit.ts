/**
 * 簡易レート制限。
 *
 * サーバーレスではインスタンスごとのメモリなので厳密な保証はない（ベストエフォート）。
 * 明確な連投・スクリプト投稿を抑える目的で使う。
 * 厳密な制限が必要になった場合は Upstash Redis 等の外部ストアへ差し替える。
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000;

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size > MAX_BUCKETS) {
      for (const [existingKey, existingBucket] of buckets) {
        if (existingBucket.resetAt <= now) buckets.delete(existingKey);
      }
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Content-Length で明らかに過大なリクエストを本文読み込み前に弾く */
export function isOversizedBody(request: Request, maxBytes: number) {
  const length = Number(request.headers.get("content-length") || 0);
  return Number.isFinite(length) && length > maxBytes;
}

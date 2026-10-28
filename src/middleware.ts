import { NextResponse, type NextRequest } from "next/server";

const UNAUTHORIZED_HEADERS = {
  "WWW-Authenticate": 'Basic realm="degi-juu admin"',
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

// 既知の悪意あるボット・スキャナーのUser-Agent
const BLOCKED_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /zgrab/i,
  /nuclei/i,
  /acunetix/i,
  /burpsuite/i,
  /nessus/i,
  /openvas/i,
];

function isBlockedUserAgent(ua: string | null): boolean {
  if (!ua) return false;
  return BLOCKED_UA_PATTERNS.some((pattern) => pattern.test(ua));
}

// APIルートへの簡易レート制限（IPごとのリクエスト記録）
const apiRequestLog = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;      // 30リクエスト
const RATE_WINDOW = 60_000; // 1分間

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = apiRequestLog.get(ip);

  if (!record || now > record.resetAt) {
    apiRequestLog.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  record.count += 1;
  if (record.count > RATE_LIMIT) return true;
  return false;
}

/** 長さの違いで早期returnしないよう、固定長までまとめて比較する */
function safeEqual(a: string, b: string) {
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  const length = Math.max(aBytes.length, bBytes.length);

  let diff = aBytes.length ^ bBytes.length;
  for (let i = 0; i < length; i += 1) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }

  return diff === 0;
}

function parseBasicAuth(header: string | null) {
  if (!header?.startsWith("Basic ")) return null;

  try {
    const decoded = atob(header.slice(6).trim());
    const separator = decoded.indexOf(":");
    if (separator < 0) return null;

    return {
      user: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    // 不正なBase64でも500にせず、認証失敗として扱う
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent");

  // 悪意あるスキャナーをブロック
  if (isBlockedUserAgent(ua)) {
    return new NextResponse(null, { status: 403 });
  }

  // APIルートへのレート制限
  if (pathname.startsWith("/api/")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Retry-After": "60",
          "Cache-Control": "no-store",
        },
      });
    }
  }

  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Admin access is disabled until ADMIN_PASSWORD is set.", {
        status: 503,
        headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
      });
    }

    return NextResponse.next();
  }

  const user = process.env.ADMIN_USER || "admin";
  const credentials = parseBasicAuth(request.headers.get("authorization"));

  if (credentials && safeEqual(credentials.user, user) && safeEqual(credentials.password, password)) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: UNAUTHORIZED_HEADERS,
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/:path*"],
};

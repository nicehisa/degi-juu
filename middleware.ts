import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Admin access is disabled until ADMIN_PASSWORD is set.", {
        status: 503,
      });
    }

    return NextResponse.next();
  }

  const user = process.env.ADMIN_USER || "admin";
  const auth = request.headers.get("authorization");

  if (auth?.startsWith("Basic ")) {
    const decoded = atob(auth.slice(6));
    const separator = decoded.indexOf(":");
    const inputUser = decoded.slice(0, separator);
    const inputPassword = decoded.slice(separator + 1);

    if (inputUser === user && inputPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="degi-juu admin"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};

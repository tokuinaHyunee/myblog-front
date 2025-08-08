// /admin 하위 라우트 접근 시 쿠키에 access_token 없으면 /login 으로
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (url.pathname.startsWith("/admin")) {
    const hasToken = req.cookies.get("access_token")?.value;
    if (!hasToken) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

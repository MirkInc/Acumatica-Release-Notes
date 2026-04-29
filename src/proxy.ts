import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isValidSessionToken, SESSION_COOKIE } from "@/lib/session";

const PUBLIC_PATHS = ["/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(?:ico|png|jpg|jpeg|svg|webp|css|js|map)$/);

  if (isAsset || PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const hasSession = isValidSessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  );

  if (!hasSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

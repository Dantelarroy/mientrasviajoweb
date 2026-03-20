import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === "mientrasviajo.com") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.mientrasviajo.com";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

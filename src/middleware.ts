import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAdminArea = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/admin/login");
  const isAuthed = Boolean(req.auth);

  if (isAdminArea && !isLogin && !isAuthed) {
    const url = new URL("/admin/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && isAuthed) {
    return NextResponse.redirect(new URL("/admin/posts", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};

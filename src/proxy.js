import { NextResponse } from "next/server";

export default function proxy(request) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;
  
  const protectedPaths = [
    "/atlas",
    "/arena",
    "/lens",
    "/aksara",
    "/leaderboard",
  ];
  
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  
  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}
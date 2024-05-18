import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

const protectedRoutes = ["/dashboard", "/account", "/orders"];

export async function middleware(req: NextRequest) {
  const isAuthenticated = await verifyToken();

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

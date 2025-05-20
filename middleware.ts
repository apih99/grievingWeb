import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth")
  const usernameCookie = request.cookies.get("username")
  const path = request.nextUrl.pathname
  
  // Debug cookies
  console.log(`Middleware check for ${path}:`, {
    authCookie: authCookie?.value || "missing",
    usernameCookie: usernameCookie?.value || "missing",
    allCookies: request.cookies.getAll().map(c => c.name)
  })

  // Protected routes
  if ((path === "/submit" || path === "/thank-you" || path === "/admin") && !authCookie) {
    console.log(`Redirecting from ${path} to / due to missing auth cookie`)
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/submit", "/thank-you", "/admin"],
}

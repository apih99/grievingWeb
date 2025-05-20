import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// Handle both GET and POST requests for logout
export async function GET() {
  return handleLogout()
}

export async function POST() {
  return handleLogout()
}

function handleLogout() {
  // Clear the authentication cookies
  cookies().delete("auth")
  cookies().delete("username")

  // Return a response with headers that will expire client-side cookies too
  const response = NextResponse.json({ success: true })
  
  // Set cookie expiration to a past date to force browsers to remove them
  response.cookies.set("auth", "", { 
    expires: new Date(0),
    path: "/"
  })
  
  response.cookies.set("username", "", { 
    expires: new Date(0),
    path: "/"
  })
  
  return response
} 
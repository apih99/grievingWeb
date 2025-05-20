import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// Hardcoded credentials - in a real app, you'd use a more secure approach
const VALID_USERNAME = "aleyanadhirah"
const VALID_PASSWORD = "sayacantikcomel"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body
    
    console.log("Login attempt details:", { 
      username, 
      password, 
      validUsername: VALID_USERNAME, 
      validPassword: VALID_PASSWORD,
      usernameMatches: username === VALID_USERNAME,
      passwordMatches: password === VALID_PASSWORD 
    })

    // Explicit string comparison
    const usernameMatches = String(username) === String(VALID_USERNAME)
    const passwordMatches = String(password) === String(VALID_PASSWORD)
    
    console.log("String comparison results:", { usernameMatches, passwordMatches })

    if (usernameMatches && passwordMatches) {
      // Create a response first
      const response = NextResponse.json({ success: true })
      
      // Set cookies directly on the response object
      response.cookies.set("auth", "true", {
        httpOnly: true, 
        secure: false, // Allow non-HTTPS in development
        maxAge: 86400, // 1 day in seconds
        path: "/",
        sameSite: "lax"
      })
      
      response.cookies.set("username", username, {
        httpOnly: true,
        secure: false, // Allow non-HTTPS in development
        maxAge: 86400, // 1 day in seconds
        path: "/",
        sameSite: "lax"
      })
      
      console.log("Login successful, cookies set:", {
        authCookie: response.cookies.get("auth"),
        usernameCookie: response.cookies.get("username")
      })
      
      return response
    }
    
    console.log("Login failed: invalid credentials")
    return NextResponse.json({ 
      success: false, 
      message: "Invalid username or password", 
      debug: { usernameMatches, passwordMatches } 
    }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

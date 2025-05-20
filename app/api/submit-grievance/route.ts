import { type NextRequest, NextResponse } from "next/server"
import { sendTelegramMessage } from "@/lib/telegram"

export async function POST(request: NextRequest) {
  try {
    console.log("Starting grievance submission...")
    const body = await request.json()
    const { title, description, mood, severity, username } = body

    console.log("Received grievance data:", { title, mood, severity, username })

    // Get mood and severity labels
    const moodMap: Record<string, string> = {
      angry: "😠 Angry",
      sad: "😢 Sad",
      annoyed: "😒 Annoyed",
      disappointed: "😞 Disappointed",
      frustrated: "😤 Frustrated",
    }

    const severityMap: Record<string, string> = {
      low: "A chunky kitkat would fix this 🍫",
      medium: "Need a hug and chocolate 🤗",
      high: "We need to talk... 😐",
      critical: "You're in big trouble mister! 😡",
    }

    // Create message content
    const message = `
🌹 <b>New Grievance Submitted</b>

<b>From:</b> ${username}
<b>Title:</b> ${title}
<b>Description:</b> ${description}
<b>Mood:</b> ${moodMap[mood] || mood}
<b>Severity:</b> ${severityMap[severity] || severity}

<i>Time to make things right! 💕</i>
`
    console.log("Prepared Telegram message:", message)
    console.log("Attempting to send Telegram message...")

    // Send the message using our Telegram bot
    const result = await sendTelegramMessage(message)
    console.log("Telegram send result:", result)

    // If we're in preview mode, we'll get a success with preview flag
    if (result.success) {
      // Store the grievance data in a simulated database (just logging in preview)
      console.log("Grievance stored:", {
        username,
        title,
        description,
        mood: moodMap[mood] || mood,
        severity: severityMap[severity] || severity,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        preview: result.preview || false,
      })
    }

    // If sending failed
    console.error("Failed to send notification:", result.error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to send notification",
      details: result.error 
    }, { status: 500 })
  } catch (error) {
    console.error("Error processing grievance:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to process grievance",
      details: String(error)
    }, { status: 500 })
  }
}

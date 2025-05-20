import { NextResponse } from "next/server"
import { sendTelegramMessage } from "@/lib/telegram"
import { isPreviewEnvironment } from "@/lib/environment"

// This is a test endpoint to verify Telegram bot works
export async function GET() {
  try {
    // Check if we're in a preview environment
    const inPreview = isPreviewEnvironment()
    
    const result = await sendTelegramMessage(`
🧪 <b>Test Message from Grievance Portal</b>

This is a test message to verify that your Telegram bot is working correctly.
If you're seeing this, the bot is properly configured! 🎉

<i>All grievances will be sent to this chat.</i>
`)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: inPreview ? "Message sending simulated successfully in preview mode" : "Test message sent successfully",
        preview: result.preview || false,
      })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in test-telegram route:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
} 
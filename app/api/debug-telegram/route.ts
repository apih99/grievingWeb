import { NextResponse } from "next/server"

export async function GET() {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json({
        error: "Missing configuration",
        botToken: !!botToken,
        chatId: !!chatId
      }, { status: 400 })
    }

    // Try to send a test message
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: "🔍 Debug test message\nIf you see this, the bot is working!",
      }),
    })

    const data = await response.json()

    return NextResponse.json({
      success: response.ok,
      statusCode: response.status,
      telegramResponse: data,
      botTokenValid: response.status !== 401,
      chatIdValid: !data.description?.includes("chat not found")
    })
  } catch (error) {
    return NextResponse.json({
      error: String(error),
      success: false
    }, { status: 500 })
  }
} 
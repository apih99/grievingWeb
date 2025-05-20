import { NextResponse } from "next/server"

export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  
  return NextResponse.json({
    botConfigured: !!botToken,
    chatConfigured: !!chatId,
    botTokenPreview: botToken ? `${botToken.slice(0, 5)}...${botToken.slice(-5)}` : null,
    chatIdPreview: chatId || null,
    nodeEnv: process.env.NODE_ENV
  })
} 
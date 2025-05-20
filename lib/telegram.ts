"use server"

import { isPreviewEnvironment } from "./environment"

export async function sendTelegramMessage(text: string) {
  try {
    // Check if we're in a preview environment
    if (isPreviewEnvironment()) {
      console.log("Preview environment detected. Simulating Telegram message send.")
      console.log("Message would be:", text)
      return { success: true, preview: true }
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error("Missing Telegram configuration")
      return { success: false, error: "Telegram bot not configured" }
    }

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.description || "Failed to send Telegram message")
    }

    console.log("Telegram message sent successfully")
    return { success: true }
  } catch (error) {
    console.error("Error sending Telegram message:", error)
    return { success: false, error: String(error) }
  }
} 
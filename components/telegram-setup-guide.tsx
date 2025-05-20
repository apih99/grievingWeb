"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2, InfoIcon } from "lucide-react"

export default function TelegramSetupGuide() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message?: string
    error?: string
    preview?: boolean
  } | null>(null)

  const testTelegramSetup = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/test-telegram")
      const data = await response.json()

      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Network error occurred while testing Telegram setup",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Telegram Setup Guide</CardTitle>
        <CardDescription>Verify your Telegram bot configuration is working correctly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          This portal uses a Telegram bot to send notifications when grievances are submitted. Make sure you have set
          up the following environment variables:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            <code>TELEGRAM_BOT_TOKEN</code> - Your bot token from BotFather
          </li>
          <li>
            <code>TELEGRAM_CHAT_ID</code> - Your chat ID where notifications will be sent
          </li>
        </ul>

        <p className="text-sm text-muted-foreground">
          Note: Make sure you've started a chat with your bot and obtained the correct chat ID.
        </p>

        {testResult && (
          <Alert variant={testResult.success ? "default" : "destructive"}>
            {testResult.preview ? (
              <InfoIcon className="h-4 w-4" />
            ) : testResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {testResult.preview ? "Preview Mode" : testResult.success ? "Telegram Test Successful" : "Telegram Test Failed"}
            </AlertTitle>
            <AlertDescription>
              {testResult.message || testResult.error || "Test completed."}
              {testResult.preview && (
                <p className="mt-2">
                  In production, messages will be sent using your Telegram bot. In preview mode, message sending is simulated.
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={testTelegramSetup} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Telegram Bot"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
} 
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2, InfoIcon } from "lucide-react"

export default function EmailSetupGuide() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message?: string
    error?: string
    preview?: boolean
  } | null>(null)

  const testEmailSetup = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/test-email")
      const data = await response.json()

      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Network error occurred while testing email setup",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Setup Guide</CardTitle>
        <CardDescription>Verify your email configuration is working correctly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          This portal uses MailerSend to send email notifications when grievances are submitted. Make sure you have set
          up the following environment variables:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            <code>EMAIL_USER</code> - The email address notifications will be sent from/to
          </li>
          <li>
            <code>EMAIL_API_KEY</code> - Your MailerSend API key
          </li>
        </ul>

        <p className="text-sm text-muted-foreground">
          Note: Make sure your sender email domain is verified in your MailerSend account.
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
              {testResult.preview ? "Preview Mode" : testResult.success ? "Email Test Successful" : "Email Test Failed"}
            </AlertTitle>
            <AlertDescription>
              {testResult.message || testResult.error || "Test completed."}
              {testResult.preview && (
                <p className="mt-2">
                  In production, emails will be sent using MailerSend. In preview mode, email sending is simulated.
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={testEmailSetup} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Email Setup"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export default function FallbackEmailHandler() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailData, setEmailData] = useState<{
    to: string
    subject: string
    body: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you would save this to a database or queue
      console.log("Grievance submitted:", emailData)

      // Simulate success
      setTimeout(() => {
        setIsLoading(false)
        window.location.href = "/thank-you"
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Email Preview</CardTitle>
        <CardDescription>This is a fallback for when email sending is not available in preview mode</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Email Sending Disabled</AlertTitle>
          <AlertDescription>
            Email sending is disabled in preview mode. In production, an email would be sent with the details below.
          </AlertDescription>
        </Alert>

        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <p>
            <strong>To:</strong> {process.env.EMAIL_USER || "your-email@example.com"}
          </p>
          <p>
            <strong>Subject:</strong> New Grievance Submitted
          </p>
          <p>
            <strong>Body:</strong> The grievance details would be formatted as HTML and sent via email.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Continue Anyway"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

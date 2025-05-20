"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

const moods = [
  { value: "angry", label: "😠 Angry" },
  { value: "sad", label: "😢 Sad" },
  { value: "annoyed", label: "😒 Annoyed" },
  { value: "disappointed", label: "😞 Disappointed" },
  { value: "frustrated", label: "😤 Frustrated" },
]

const severities = [
  { value: "low", label: "A chunky kitkat would fix this 🍫" },
  { value: "medium", label: "Need a hug and chocolate 🤗" },
  { value: "high", label: "We need to talk... 😐" },
  { value: "critical", label: "You're in big trouble mister! 😡" },
]

interface GrievanceFormProps {
  username: string
}

export default function GrievanceForm({ username }: GrievanceFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [mood, setMood] = useState("")
  const [severity, setSeverity] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-grievance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          mood,
          severity,
          username,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Check if we're in preview mode
        if (data.preview) {
          setIsPreview(true)
          toast({
            title: "Preview Mode",
            description: "Email would be sent in production. Redirecting in 3 seconds...",
            duration: 3000,
          })

          // Redirect after a short delay
          setTimeout(() => {
            router.push("/thank-you")
          }, 3000)
        } else {
          // Production mode - redirect immediately
          router.push("/thank-you")
        }
      } else {
        console.error("Submission error:", data)
        toast({
          title: "Submission failed",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting grievance:", error)
      toast({
        title: "Error",
        description: "Network error. Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-pink-100/80 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            Submit a Grievance <span className="text-2xl">🌹</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-white/70"
                placeholder="Title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">What's bothering you?</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[120px] bg-white/70"
                placeholder="What's bothering you?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mood">Mood:</Label>
              <Select value={mood} onValueChange={setMood} required>
                <SelectTrigger className="bg-white/70">
                  <SelectValue placeholder="Select your mood" />
                </SelectTrigger>
                <SelectContent>
                  {moods.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity:</Label>
              <Select value={severity} onValueChange={setSeverity} required>
                <SelectTrigger className="bg-white/70">
                  <SelectValue placeholder="How serious is this?" />
                </SelectTrigger>
                <SelectContent>
                  {severities.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white text-xl py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit ❤️"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isPreview && (
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Preview Mode</AlertTitle>
          <AlertDescription>
            In production, an email would be sent to hafizcr716@gmail.com with the grievance
            details. You are being redirected to the thank you page.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

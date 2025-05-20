"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  animationDuration: number;
}

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([])
  const router = useRouter()
  const { toast } = useToast()

  const addEmoji = () => {
    const newEmoji: FloatingEmoji = {
      id: Date.now(),
      emoji: ["✨", "🌸", "💖", "🎀", "🌟"][Math.floor(Math.random() * 5)],
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 2
    }
    setEmojis(prev => [...prev, newEmoji])
    setTimeout(() => {
      setEmojis(prev => prev.filter(e => e.id !== newEmoji.id))
    }, newEmoji.animationDuration * 1000)
  }

  useEffect(() => {
    const interval = setInterval(addEmoji, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Attempting login with:", { username, password })
      
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username: String(username).trim(), 
          password: String(password).trim() 
        }),
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        console.log("Login successful, redirecting...")
        // Add a delay to ensure cookies are properly set before redirecting
        setTimeout(() => {
          router.push("/submit")
          router.refresh()
        }, 500) // Increased delay for cookie propagation
      } else {
        console.error("Login failed:", data)
        toast({
          title: "Authentication failed",
          description: data.message || "Invalid username or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      {emojis.map(emoji => (
        <div
          key={emoji.id}
          className="absolute -top-10 animate-float"
          style={{
            left: `${emoji.left}%`,
            animation: `float ${emoji.animationDuration}s ease-in-out forwards`
          }}
        >
          {emoji.emoji}
        </div>
      ))}
      <Card className="p-0 overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-pink-200 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-lg font-semibold text-gray-700">
              Username
            </Label>
            <Input 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="text-lg py-6 bg-white/70 border-2 border-pink-100 focus:border-pink-300 focus:ring-pink-200"
              autoComplete="off"
              onFocus={addEmoji}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-lg font-semibold text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-lg py-6 bg-white/70 border-2 border-pink-100 focus:border-pink-300 focus:ring-pink-200"
              autoComplete="off"
              onFocus={addEmoji}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white text-xl py-7 mt-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
            disabled={isLoading}
            onClick={addEmoji}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

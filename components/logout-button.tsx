"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        router.push('/')
        router.refresh()
      } else {
        console.error('Logout failed:', await response.text())
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <Button 
      className={`bg-gray-500 hover:bg-gray-600 ${className}`}
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
} 
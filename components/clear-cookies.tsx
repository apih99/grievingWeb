"use client"

import { useEffect } from "react"

export default function ClearCookies() {
  useEffect(() => {
    // Clear cookies on component mount (page load)
    const clearCookies = async () => {
      try {
        const response = await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          console.error('Failed to clear cookies:', await response.text())
        }
      } catch (error) {
        console.error('Error clearing cookies:', error)
      }
    }
    
    // Only clear cookies if there might be some set
    if (document.cookie.includes('auth') || document.cookie.includes('username')) {
      clearCookies()
    }
  }, [])
  
  // This component doesn't render anything
  return null
} 
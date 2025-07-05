"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter, usePathname } from "next/navigation"

export function OnboardingRedirect() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [isCheckingProfile, setIsCheckingProfile] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      checkProfileCompletion()
    }
  }, [user, isLoaded, pathname])

  const checkProfileCompletion = async () => {
    if (isCheckingProfile) return
    setIsCheckingProfile(true)

    try {
      const response = await fetch('/api/onboarding')
      const data = await response.json()
      
      if (data.success) {
        const isProfileComplete = data.isComplete
        const isOnboardingPage = pathname === "/onboarding"
        const isLandingPage = pathname === "/"

        // If user is on landing page and signed in, redirect to onboarding or dashboard
        if (isLandingPage) {
          if (isProfileComplete) {
            router.push("/dashboard")
          } else {
            router.push("/onboarding")
          }
          return
        }

        // If user hasn't completed profile and is on a protected page, redirect to onboarding
        const isProtectedPage = ["/dashboard", "/applications", "/email-assist", "/profile", "/upload", "/apply"].some(page => 
          pathname.startsWith(page)
        )

        if (!isProfileComplete && isProtectedPage && !isOnboardingPage) {
          router.push("/onboarding")
          return
        }
        
        // If user has completed profile and is on onboarding page, redirect to dashboard
        if (isProfileComplete && isOnboardingPage) {
          router.push("/dashboard")
          return
        }

        // If user hasn't completed profile and is on any other page, redirect to onboarding
        if (!isProfileComplete && !isOnboardingPage) {
          router.push("/onboarding")
          return
        }
      }
    } catch (error) {
      console.error('Error checking profile completion:', error)
      // Fallback to localStorage for now
      const profileCompleted = localStorage.getItem("profileCompleted")
      if (profileCompleted !== "true" && pathname !== "/onboarding") {
        router.push("/onboarding")
      }
    } finally {
      setIsCheckingProfile(false)
    }
  }

  return null
} 
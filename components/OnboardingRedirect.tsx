"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter, usePathname } from "next/navigation"

export function OnboardingRedirect() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user has completed profile setup
      const profileCompleted = localStorage.getItem("profileCompleted")
      const isOnboardingPage = pathname === "/onboarding"
      const isProtectedPage = ["/dashboard", "/applications", "/email-assist", "/profile", "/upload", "/apply"].some(page => 
        pathname.startsWith(page)
      )

      // If user hasn't completed profile and is on a protected page, redirect to onboarding
      if (profileCompleted !== "true" && isProtectedPage && !isOnboardingPage) {
        router.push("/onboarding")
      }
      
      // If user has completed profile and is on onboarding page, redirect to dashboard
      if (profileCompleted === "true" && isOnboardingPage) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoaded, pathname, router])

  return null
} 
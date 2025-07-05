import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'  
import "./globals.css"
import { OnboardingRedirect } from "@/components/OnboardingRedirect"

const inter = Inter({ subsets: ["latin"] })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "JobBuddy - AI-Powered Job Application Assistant",
  description: "Find jobs, upload your resume, and apply with one click using AI-powered automation",
  keywords: "jobs, resume, AI, automation, career, employment, job search",
  authors: [{ name: "JobBuddy Team" }],
  openGraph: {
    title: "JobBuddy - AI-Powered Job Application Assistant",
    description: "Find jobs, upload your resume, and apply with one click using AI-powered automation",
    type: "website",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Global Auth Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    JobBuddy
                  </span>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105">
                        Get Started
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                          userButtonPopoverCard: "bg-white/10 backdrop-blur-md border border-white/20",
                          userButtonPopoverActionButton: "text-white hover:bg-white/10",
                          userButtonPopoverActionButtonText: "text-white",
                          userButtonPopoverFooter: "border-t border-white/10",
                        }
                      }}
                    />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>

          {/* Onboarding Redirect */}
          <OnboardingRedirect />
          
          {/* Main Content with top padding for fixed header */}
          <main className="pt-20">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}

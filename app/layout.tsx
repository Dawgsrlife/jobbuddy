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
          {/* Onboarding Redirect */}
          <OnboardingRedirect />
          
          {/* Main Content */}
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}

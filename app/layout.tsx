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
import { usePathname } from "next/navigation"

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
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""
  // Fallback for SSR: usePathname hook in client components only
  // We'll use a dynamic class for the body background
  const isLanding = pathname === "/"
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased ${isLanding ? "bg-gradient-to-br from-pink-400 via-yellow-300 to-blue-500" : "bg-gradient-to-br from-blue-950 via-black to-purple-950"}`}>
          {/* Onboarding Redirect */}
          <OnboardingRedirect />
          
          {/* Main Content */}
          <main className="pt-20">
            {children}
          </main>
          {/* Custom JobBuddy Footer */}
          <footer className={`w-full ${isLanding ? 'bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-500' : 'bg-gradient-to-r from-blue-950 via-black to-purple-950'} border-t border-white/10 py-8 mt-12 text-center text-white text-sm`}>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
              <div className="font-bold text-lg bg-gradient-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent">JobBuddy</div>
              <div>
                <span className="font-semibold">Team:</span> Alexander He Meng (Frontend UI/UX), Matthew Wu (PM & Designer), Vishnu Sai (Backend)
              </div>
              <div className="text-xs text-blue-200">&copy; {new Date().getFullYear()} JobBuddy. All rights reserved.</div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobBuddy - AI-Powered Job Application Assistant",
  description: "Find jobs, upload your resume, and apply with one click using AI-powered automation",
  keywords: "jobs, resume, AI, automation, career, employment, job search",
  authors: [{ name: "JobBuddy Team" }],
  openGraph: {
    title: "JobBuddy - AI-Powered Job Application Assistant",
    description: "Find jobs, upload your resume, and apply with one click using AI-powered automation",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

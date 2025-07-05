"use client"

import { useState } from "react"
import { ArrowRight, Sparkles, Target, Mail, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"

export function HeroSection() {
  const [email, setEmail] = useState("")

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
      {/* Hero Content */}
      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-300">Your Personal Outbound Job Agent</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Skip the
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            job boards
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          JobBuddy finds relevant jobs at your target companies and cold-emails hiring managers on your behalf —{" "}
          <span className="text-white font-semibold">personalized, on-time, and effective</span>
        </p>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 backdrop-blur-sm">
            <Mail className="w-5 h-5 text-blue-400" />
            <input
              type="email"
              placeholder="Enter your email to get started"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-white placeholder-gray-400 outline-none w-64"
            />
          </div>
          <SignUpButton mode="modal">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2"
            >
              Start Job Hunting
              <ArrowRight className="w-4 h-4" />
            </Button>
          </SignUpButton>
        </div>

        {/* Scroll Navigation */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="#features"
            className="text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
          >
            How It Works
          </a>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Target Companies</h3>
            <p className="text-gray-400 text-sm">Pick your dream companies. We'll monitor their job postings 24/7.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Outreach</h3>
            <p className="text-gray-400 text-sm">AI-crafted emails sent directly to hiring managers and recruiters.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Automated</h3>
            <p className="text-gray-400 text-sm">Runs in the background while you focus on what matters.</p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500" />
    </section>
  )
}

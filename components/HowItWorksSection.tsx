"use client"

import { useUser } from "@clerk/nextjs"
import { SignUpButton } from "@clerk/nextjs"
import { Upload, Target, Mail, BarChart3 } from "lucide-react"

export function HowItWorksSection() {
  const { user, isLoaded } = useUser()

  const steps = [
    {
      icon: Upload,
      title: "Upload Your Profile",
      description: "Share your resume, skills, and job preferences. Our AI learns what makes you unique.",
      color: "blue" as const,
    },
    {
      icon: Target,
      title: "Choose Target Companies",
      description: "Select your dream companies from our database of 10,000+ organizations.",
      color: "purple" as const,
    },
    {
      icon: Mail,
      title: "AI Sends Personalized Emails",
      description: "When relevant jobs appear, we craft and send professional emails to hiring managers.",
      color: "green" as const,
    },
    {
      icon: BarChart3,
      title: "Track & Optimize",
      description: "Monitor responses, book interviews, and continuously improve your outreach strategy.",
      color: "orange" as const,
    },
  ]

  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-red-500",
  }

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">How It Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Set it up once, then let JobBuddy work in the background while you focus on preparing for interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
              )}

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 relative z-10">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${colorMap[step.color]} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">Step {index + 1}</div>
                  <h3 className="text-lg font-semibold mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          {isLoaded && user ? (
            <a
              href="/dashboard"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Go to Dashboard
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </a>
          ) : (
            <SignUpButton mode="modal">
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105">
                Get Started Now
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </button>
            </SignUpButton>
          )}
        </div>
      </div>
    </section>
  )
}

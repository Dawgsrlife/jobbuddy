"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { User, Mail, Phone, MapPin, FileText, Send } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    coverLetter:
      "Dear Hiring Manager,\n\nI am excited to apply for this position. With my background in software development and passion for creating innovative solutions, I believe I would be a great fit for your team.\n\nBest regards,\nJohn Doe",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { user, isLoaded } = useUser()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to apply for jobs</h1>
          <p className="text-gray-400">You need to be authenticated to use this feature.</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md text-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Application Sent! 🎉</h2>
          <p className="text-gray-400 mb-6">
            Your application has been submitted successfully. The employer will review it and get back to you soon.
          </p>
          <div className="space-y-3">
            <a
              href="/dashboard"
              className="block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Go to Dashboard
            </a>
            <button
              onClick={() => setSubmitted(false)}
              className="block w-full text-gray-400 hover:text-white transition-colors"
            >
              Apply to Another Job
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />

      <DashboardHeader />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">⚡ Quick Apply</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your information has been pre-filled from your resume. Review and submit with one click!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Job Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Applying for:</h2>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400">Frontend Developer</h3>
              <p className="text-blue-300">TechCorp • San Francisco, CA</p>
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6">Application Details</h2>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Cover Letter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                  <FileText className="w-4 h-4" />
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </button>
            </div>

            {/* Note */}
            <p className="text-sm text-gray-400 text-center mt-4">
              💡 Your information was automatically filled from your uploaded resume
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

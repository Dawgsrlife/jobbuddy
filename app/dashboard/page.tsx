"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { JobMatchCard } from "@/components/dashboard/JobMatchCard"
import { OutreachCard } from "@/components/dashboard/OutreachCard"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { CompanySelector } from "@/components/dashboard/CompanySelector"

const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Stripe",
    location: "San Francisco, CA",
    matchScore: 94,
    postedDate: "2 hours ago",
    description: "Build the future of online payments with React and TypeScript",
    contactFound: true,
    contactName: "Sarah Chen",
    contactRole: "Engineering Manager",
    emailStatus: "ready" as const,
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "Vercel",
    location: "Remote",
    matchScore: 89,
    postedDate: "5 hours ago",
    description: "Help build the platform that powers the modern web",
    contactFound: true,
    contactName: "Lee Robinson",
    contactRole: "VP of Developer Experience",
    emailStatus: "sent" as const,
  },
  {
    id: "3",
    title: "Software Engineer - AI/ML",
    company: "OpenAI",
    location: "San Francisco, CA",
    matchScore: 87,
    postedDate: "1 day ago",
    description: "Work on cutting-edge AI systems that benefit humanity",
    contactFound: false,
    contactName: "",
    contactRole: "",
    emailStatus: "searching" as const,
  },
]

const mockOutreach = [
  {
    id: "1",
    recipientName: "Sarah Chen",
    recipientRole: "Engineering Manager",
    company: "Stripe",
    jobTitle: "Senior Frontend Developer",
    status: "responded" as const,
    sentDate: "2024-01-15",
    responseDate: "2024-01-16",
    subject: "Interested in Frontend Developer role at Stripe",
  },
  {
    id: "2",
    recipientName: "Lee Robinson",
    recipientRole: "VP of Developer Experience",
    company: "Vercel",
    jobTitle: "Full Stack Engineer",
    status: "sent" as const,
    sentDate: "2024-01-15",
    subject: "Full Stack Engineer opportunity at Vercel",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "outreach" | "settings">("jobs")
  const { user, isLoaded } = useUser()
  const router = useRouter()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!user) {
    router.push("/")
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />

      <DashboardHeader />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress}!
          </h1>
          <p className="text-gray-400">Here's what's happening with your job search today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Jobs Found" value="23" subtitle="This week" color="blue" />
          <StatsCard title="Emails Sent" value="18" subtitle="This week" color="purple" />
          <StatsCard title="Responses" value="5" subtitle="27% rate" color="green" />
          <StatsCard title="Interviews" value="2" subtitle="Scheduled" color="orange" />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-8 w-fit">
          {[
            { key: "jobs", label: "Job Matches" },
            { key: "outreach", label: "Outreach" },
            { key: "settings", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.key ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Job Matches</h2>
              <div className="text-sm text-gray-400">Showing jobs from your target companies with 85+ match score</div>
            </div>
            <div className="grid gap-6">
              {mockJobs.map((job) => (
                <JobMatchCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "outreach" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Outreach Activity</h2>
              <div className="text-sm text-gray-400">Recent emails sent on your behalf</div>
            </div>
            <div className="grid gap-6">
              {mockOutreach.map((outreach) => (
                <OutreachCard key={outreach.id} outreach={outreach} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <CompanySelector />
          </div>
        )}
      </div>
    </div>
  )
}

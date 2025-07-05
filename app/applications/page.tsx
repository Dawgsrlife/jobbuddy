"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { 
  FileText, 
  Mail, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Filter,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Application {
  id: string
  jobTitle: string
  company: string
  status: "applied" | "interviewing" | "rejected" | "accepted" | "no-response"
  appliedDate: string
  lastUpdated: string
  applicationType: "cold-email" | "job-portal" | "direct"
  emailSent?: boolean
  emailOpened?: boolean
  emailReplied?: boolean
  coverLetter?: string
  notes?: string
}

const mockApplications: Application[] = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "Stripe",
    status: "interviewing",
    appliedDate: "2024-01-15",
    lastUpdated: "2024-01-20",
    applicationType: "cold-email",
    emailSent: true,
    emailOpened: true,
    emailReplied: true,
    coverLetter: "I'm excited to apply for the Senior Frontend Developer role at Stripe...",
    notes: "Had initial phone screen, moving to technical interview"
  },
  {
    id: "2",
    jobTitle: "Full Stack Engineer",
    company: "Vercel",
    status: "applied",
    appliedDate: "2024-01-18",
    lastUpdated: "2024-01-18",
    applicationType: "cold-email",
    emailSent: true,
    emailOpened: true,
    emailReplied: false,
    coverLetter: "I'm interested in the Full Stack Engineer position at Vercel..."
  },
  {
    id: "3",
    jobTitle: "Software Engineer - AI/ML",
    company: "OpenAI",
    status: "no-response",
    appliedDate: "2024-01-10",
    lastUpdated: "2024-01-10",
    applicationType: "cold-email",
    emailSent: true,
    emailOpened: false,
    emailReplied: false
  },
  {
    id: "4",
    jobTitle: "React Developer",
    company: "Netflix",
    status: "rejected",
    appliedDate: "2024-01-05",
    lastUpdated: "2024-01-12",
    applicationType: "job-portal",
    emailSent: false,
    notes: "Rejected after technical assessment"
  }
]

export default function ApplicationsPage() {
  const { user, isLoaded } = useUser()
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

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
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your applications</h1>
          <p className="text-gray-400">You need to be authenticated to view this page.</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "interviewing":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "accepted":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "rejected":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      case "no-response":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "interviewing":
        return <Clock className="w-4 h-4" />
      case "accepted":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <AlertCircle className="w-4 h-4" />
      case "no-response":
        return <Clock className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "interviewing":
        return "Interviewing"
      case "accepted":
        return "Accepted"
      case "rejected":
        return "Rejected"
      case "no-response":
        return "No Response"
      default:
        return "Applied"
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesType = typeFilter === "all" || app.applicationType === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: applications.length,
    interviewing: applications.filter(app => app.status === "interviewing").length,
    accepted: applications.filter(app => app.status === "accepted").length,
    rejected: applications.filter(app => app.status === "rejected").length,
    noResponse: applications.filter(app => app.status === "no-response").length
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />

      <DashboardHeader />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Applications</h1>
          <p className="text-gray-400">Track your job applications and cold email outreach</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-gray-400">Total</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{stats.interviewing}</div>
            <div className="text-sm text-gray-400">Interviewing</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{stats.accepted}</div>
            <div className="text-sm text-gray-400">Accepted</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
            <div className="text-sm text-gray-400">Rejected</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">{stats.noResponse}</div>
            <div className="text-sm text-gray-400">No Response</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="no-response">No Response</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">All Types</option>
              <option value="cold-email">Cold Email</option>
              <option value="job-portal">Job Portal</option>
              <option value="direct">Direct</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{app.jobTitle}</h3>
                  <p className="text-gray-400 mb-2">{app.company}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                    <span>Updated: {new Date(app.lastUpdated).toLocaleDateString()}</span>
                    <span className="capitalize">{app.applicationType.replace("-", " ")}</span>
                  </div>

                  {app.coverLetter && (
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                      {app.coverLetter}
                    </p>
                  )}

                  {app.notes && (
                    <div className="bg-white/5 border border-white/10 rounded p-3 mb-3">
                      <p className="text-sm text-gray-300">{app.notes}</p>
                    </div>
                  )}

                  {app.applicationType === "cold-email" && (
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span className={app.emailSent ? "text-green-400" : "text-gray-400"}>
                          {app.emailSent ? "Sent" : "Not Sent"}
                        </span>
                      </div>
                      {app.emailSent && (
                        <>
                          <div className="flex items-center gap-1">
                            <span className={app.emailOpened ? "text-blue-400" : "text-gray-400"}>
                              {app.emailOpened ? "Opened" : "Not Opened"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={app.emailReplied ? "text-green-400" : "text-gray-400"}>
                              {app.emailReplied ? "Replied" : "No Reply"}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    {getStatusText(app.status)}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No applications found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
} 
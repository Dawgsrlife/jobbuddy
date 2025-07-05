"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { 
  Mail, 
  Send, 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Building2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Email {
  id: string
  subject: string
  recipientName: string
  recipientRole: string
  company: string
  jobTitle: string
  status: "draft" | "sent" | "opened" | "replied"
  createdAt: string
  sentAt?: string
  openedAt?: string
  repliedAt?: string
  content: string
  jobId?: string
}

const mockEmails: Email[] = [
  {
    id: "1",
    subject: "Interested in Senior Frontend Developer role at Stripe",
    recipientName: "Sarah Chen",
    recipientRole: "Engineering Manager",
    company: "Stripe",
    jobTitle: "Senior Frontend Developer",
    status: "replied",
    createdAt: "2024-01-15T10:00:00Z",
    sentAt: "2024-01-15T10:30:00Z",
    openedAt: "2024-01-15T14:20:00Z",
    repliedAt: "2024-01-16T09:15:00Z",
    content: "Hi Sarah,\n\nI hope this email finds you well. I came across the Senior Frontend Developer position at Stripe and I'm very excited about the opportunity...",
    jobId: "job-1"
  },
  {
    id: "2",
    subject: "Full Stack Engineer opportunity at Vercel",
    recipientName: "Lee Robinson",
    recipientRole: "VP of Developer Experience",
    company: "Vercel",
    jobTitle: "Full Stack Engineer",
    status: "opened",
    createdAt: "2024-01-18T09:00:00Z",
    sentAt: "2024-01-18T09:15:00Z",
    openedAt: "2024-01-18T11:30:00Z",
    content: "Hi Lee,\n\nI'm reaching out regarding the Full Stack Engineer position at Vercel...",
    jobId: "job-2"
  },
  {
    id: "3",
    subject: "Software Engineer - AI/ML position at OpenAI",
    recipientName: "Alex Johnson",
    recipientRole: "Hiring Manager",
    company: "OpenAI",
    jobTitle: "Software Engineer - AI/ML",
    status: "sent",
    createdAt: "2024-01-10T08:00:00Z",
    sentAt: "2024-01-10T08:30:00Z",
    content: "Hi Alex,\n\nI'm interested in the Software Engineer - AI/ML position at OpenAI...",
    jobId: "job-3"
  },
  {
    id: "4",
    subject: "React Developer role at Netflix",
    recipientName: "Maria Garcia",
    recipientRole: "Engineering Director",
    company: "Netflix",
    jobTitle: "React Developer",
    status: "draft",
    createdAt: "2024-01-20T15:00:00Z",
    content: "Hi Maria,\n\nI'm writing to express my interest in the React Developer position at Netflix...",
    jobId: "job-4"
  }
]

export default function EmailAssistPage() {
  const { user, isLoaded } = useUser()
  const [emails, setEmails] = useState<Email[]>(mockEmails)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<"drafts" | "sent" | "all">("all")
  const [showCompose, setShowCompose] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)

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
          <h1 className="text-2xl font-bold mb-4">Please sign in to access Email Assist</h1>
          <p className="text-gray-400">You need to be authenticated to view this page.</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "replied":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "opened":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "sent":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "draft":
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "replied":
        return "Replied"
      case "opened":
        return "Opened"
      case "sent":
        return "Sent"
      case "draft":
        return "Draft"
      default:
        return "Unknown"
    }
  }

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || email.status === statusFilter
    const matchesTab = activeTab === "all" || email.status === activeTab
    
    return matchesSearch && matchesStatus && matchesTab
  })

  const stats = {
    total: emails.length,
    drafts: emails.filter(email => email.status === "draft").length,
    sent: emails.filter(email => email.status === "sent").length,
    opened: emails.filter(email => email.status === "opened").length,
    replied: emails.filter(email => email.status === "replied").length
  }

  const handleDeleteEmail = (emailId: string) => {
    setEmails(emails.filter(email => email.id !== emailId))
  }

  const handleSendEmail = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId 
        ? { ...email, status: "sent", sentAt: new Date().toISOString() }
        : email
    ))
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />

      <DashboardHeader />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Email Assist</h1>
            <p className="text-gray-400">Manage your cold email outreach and drafts</p>
          </div>
          <Button
            onClick={() => setShowCompose(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Compose Email
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-gray-400">Total</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-400">{stats.drafts}</div>
            <div className="text-sm text-gray-400">Drafts</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">{stats.sent}</div>
            <div className="text-sm text-gray-400">Sent</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{stats.opened}</div>
            <div className="text-sm text-gray-400">Opened</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{stats.replied}</div>
            <div className="text-sm text-gray-400">Replied</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-8 w-fit">
          {[
            { key: "all", label: "All Emails" },
            { key: "drafts", label: "Drafts" },
            { key: "sent", label: "Sent" },
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

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="opened">Opened</option>
            <option value="replied">Replied</option>
          </select>
        </div>

        {/* Emails List */}
        <div className="space-y-4">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{email.subject}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{email.recipientName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span>{email.company}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {email.content}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Created: {new Date(email.createdAt).toLocaleDateString()}</span>
                    {email.sentAt && (
                      <span>Sent: {new Date(email.sentAt).toLocaleDateString()}</span>
                    )}
                    {email.openedAt && (
                      <span>Opened: {new Date(email.openedAt).toLocaleDateString()}</span>
                    )}
                    {email.repliedAt && (
                      <span>Replied: {new Date(email.repliedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(email.status)}`}>
                    <Mail className="w-4 h-4" />
                    {getStatusText(email.status)}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedEmail(email)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    
                    {email.status === "draft" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendEmail(email.id)}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteEmail(email.id)}
                      className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmails.length === 0 && (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No emails found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Email Preview Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Email Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedEmail(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Subject</label>
                <p className="text-white font-medium">{selectedEmail.subject}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">To</label>
                  <p className="text-white">{selectedEmail.recipientName} ({selectedEmail.recipientRole})</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Company</label>
                  <p className="text-white">{selectedEmail.company}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-400">Content</label>
                <div className="bg-white/5 border border-white/10 rounded p-4 mt-2">
                  <p className="text-white whitespace-pre-wrap">{selectedEmail.content}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Created: {new Date(selectedEmail.createdAt).toLocaleDateString()}</span>
                {selectedEmail.sentAt && (
                  <span>Sent: {new Date(selectedEmail.sentAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compose Email Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-2xl mx-4 w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Compose Email</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCompose(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Subject</label>
                <Input
                  placeholder="Email subject..."
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Recipient Name</label>
                  <Input
                    placeholder="Recipient name..."
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Company</label>
                  <Input
                    placeholder="Company name..."
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email Content</label>
                <Textarea
                  placeholder="Write your email content..."
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 min-h-[200px]"
                  rows={8}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCompose(false)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Save Draft
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
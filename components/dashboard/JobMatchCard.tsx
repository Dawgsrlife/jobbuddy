import { Building2, MapPin, Clock, Mail, Eye, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JobMatchCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    matchScore: number
    postedDate: string
    description: string
    contactFound: boolean
    contactName: string
    contactRole: string
    emailStatus: "ready" | "sent" | "searching"
  }
}

export function JobMatchCard({ job }: JobMatchCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "sent":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "searching":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "Ready to Send"
      case "sent":
        return "Email Sent"
      case "searching":
        return "Finding Contact"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-white">{job.title}</h3>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.emailStatus)}`}>
              {getStatusText(job.emailStatus)}
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              {job.company}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {job.postedDate}
            </div>
          </div>

          <p className="text-gray-300 mb-4">{job.description}</p>

          {job.contactFound && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-4">
              <div className="text-sm text-gray-400 mb-1">Contact Found:</div>
              <div className="text-white font-medium">{job.contactName}</div>
              <div className="text-gray-400 text-sm">{job.contactRole}</div>
            </div>
          )}
        </div>

        <div className="text-right ml-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1">
            {job.matchScore}%
          </div>
          <div className="text-xs text-gray-400">Match Score</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2"
          disabled={job.emailStatus === "sent" || job.emailStatus === "searching"}
        >
          {job.emailStatus === "ready" && (
            <>
              <Mail className="w-4 h-4" />
              Send Email
            </>
          )}
          {job.emailStatus === "sent" && (
            <>
              <Zap className="w-4 h-4" />
              Email Sent
            </>
          )}
          {job.emailStatus === "searching" && (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Finding Contact
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/10 flex items-center gap-2 bg-transparent"
        >
          <Eye className="w-4 h-4" />
          Preview Email
        </Button>
      </div>
    </div>
  )
}

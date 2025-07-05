import { Mail, CheckCircle, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OutreachCardProps {
  outreach: {
    id: string
    recipientName: string
    recipientRole: string
    company: string
    jobTitle: string
    status: "sent" | "responded" | "opened"
    sentDate: string
    responseDate?: string
    subject: string
  }
}

export function OutreachCard({ outreach }: OutreachCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "responded":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "opened":
        return <Mail className="w-4 h-4 text-blue-400" />
      case "sent":
        return <Clock className="w-4 h-4 text-yellow-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "responded":
        return "Responded"
      case "opened":
        return "Opened"
      case "sent":
        return "Sent"
      default:
        return "Unknown"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "responded":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "opened":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "sent":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white">{outreach.subject}</h3>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(outreach.status)}`}
            >
              {getStatusIcon(outreach.status)}
              {getStatusText(outreach.status)}
            </div>
          </div>

          <div className="text-gray-300 mb-2">
            <span className="font-medium">{outreach.recipientName}</span> • {outreach.recipientRole}
          </div>

          <div className="text-gray-400 text-sm mb-3">
            {outreach.company} • {outreach.jobTitle}
          </div>

          <div className="text-gray-500 text-sm">
            Sent {new Date(outreach.sentDate).toLocaleDateString()}
            {outreach.responseDate && <span> • Responded {new Date(outreach.responseDate).toLocaleDateString()}</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {outreach.status === "responded" && (
          <Button
            size="sm"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Response
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/10 flex items-center gap-2 bg-transparent"
        >
          <Mail className="w-4 h-4" />
          View Email
        </Button>
      </div>
    </div>
  )
}

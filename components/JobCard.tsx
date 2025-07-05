import { ExternalLink, MapPin, Building2 } from "lucide-react"

interface JobCardProps {
  title: string
  company: string
  location: string
  url: string
  description?: string
}

export function JobCard({ title, company, location, url, description }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
      {/* Job Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>

      {/* Company */}
      <div className="flex items-center text-gray-600 mb-2">
        <Building2 className="w-4 h-4 mr-2" />
        <span className="font-medium">{company}</span>
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-500 mb-4">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{location}</span>
      </div>

      {/* Description */}
      {description && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>}

      {/* Apply Button */}
      <div className="flex gap-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </a>
        <a href="/apply" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
          Quick Apply
        </a>
      </div>
    </div>
  )
}

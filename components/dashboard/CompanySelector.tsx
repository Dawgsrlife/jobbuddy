"use client"

import { useState } from "react"
import { Search, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const popularCompanies = [
  { name: "Google", logo: "🔍", employees: "150K+" },
  { name: "Microsoft", logo: "🪟", employees: "220K+" },
  { name: "Apple", logo: "🍎", employees: "165K+" },
  { name: "Amazon", logo: "📦", employees: "1.5M+" },
  { name: "Meta", logo: "👥", employees: "87K+" },
  { name: "Netflix", logo: "🎬", employees: "13K+" },
  { name: "Stripe", logo: "💳", employees: "8K+" },
  { name: "Vercel", logo: "▲", employees: "300+" },
  { name: "OpenAI", logo: "🤖", employees: "1K+" },
  { name: "Anthropic", logo: "🧠", employees: "500+" },
]

export function CompanySelector() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(["Google", "Stripe", "Vercel"])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompanies = popularCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedCompanies.includes(company.name),
  )

  const addCompany = (companyName: string) => {
    setSelectedCompanies([...selectedCompanies, companyName])
    setSearchTerm("")
  }

  const removeCompany = (companyName: string) => {
    setSelectedCompanies(selectedCompanies.filter((name) => name !== companyName))
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Target Companies</h3>
        <p className="text-gray-400">Choose companies you want to work for. We'll monitor their job postings.</p>
      </div>

      {/* Selected Companies */}
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-3">Selected Companies ({selectedCompanies.length})</div>
        <div className="flex flex-wrap gap-3">
          {selectedCompanies.map((companyName) => {
            const company = popularCompanies.find((c) => c.name === companyName)
            return (
              <div
                key={companyName}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 flex items-center gap-3"
              >
                <span className="text-lg">{company?.logo}</span>
                <span className="text-white font-medium">{companyName}</span>
                <button
                  onClick={() => removeCompany(companyName)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Available Companies */}
      <div>
        <div className="text-sm text-gray-400 mb-3">Popular Companies</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
          {filteredCompanies.map((company) => (
            <div
              key={company.name}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              onClick={() => addCompany(company.name)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{company.logo}</span>
                <div className="flex-1">
                  <div className="text-white font-medium">{company.name}</div>
                  <div className="text-gray-400 text-sm">{company.employees} employees</div>
                </div>
                <Plus className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          Save Target Companies
        </Button>
      </div>
    </div>
  )
}

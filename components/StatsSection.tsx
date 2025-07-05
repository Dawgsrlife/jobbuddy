"use client"

import { useEffect, useState } from "react"

export function StatsSection() {
  const [counts, setCounts] = useState({ emails: 0, responses: 0, interviews: 0 })

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounts({ emails: 2847, responses: 68, interviews: 23 })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              {counts.emails.toLocaleString()}+
            </div>
            <div className="text-gray-300 text-lg">Emails Sent</div>
            <div className="text-gray-500 text-sm mt-1">This month</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {counts.responses}%
            </div>
            <div className="text-gray-300 text-lg">Response Rate</div>
            <div className="text-gray-500 text-sm mt-1">Above industry average</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              {counts.interviews}+
            </div>
            <div className="text-gray-300 text-lg">Interviews Booked</div>
            <div className="text-gray-500 text-sm mt-1">For our users</div>
          </div>
        </div>
      </div>
    </section>
  )
}

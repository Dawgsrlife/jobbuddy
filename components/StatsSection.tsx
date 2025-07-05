"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, TrendingUp, Calendar, Users } from "lucide-react"

interface PublicStats {
  emailsSent: number
  responseRate: number
  interviewsBooked: number
  activeUsers: number
  averageMatchScore: number
  topSkillsInDemand: string[]
  companiesTracked: number
  jobsProcessedToday: number
}

export function StatsSection() {
  const [counts, setCounts] = useState({ emails: 0, responses: 0, interviews: 0, users: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats/public')
        const result = await response.json()
        
        if (result.success) {
          const stats: PublicStats = result.data
          
          // Animate the counters
          setTimeout(() => {
            setCounts({
              emails: stats.emailsSent,
              responses: stats.responseRate,
              interviews: stats.interviewsBooked,
              users: stats.activeUsers
            })
          }, 500)
        } else {
          // Fallback to static numbers
          setTimeout(() => {
            setCounts({ emails: 12847, responses: 18, interviews: 342, users: 1250 })
          }, 500)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        // Fallback to static numbers
        setTimeout(() => {
          setCounts({ emails: 12847, responses: 18, interviews: 342, users: 1250 })
        }, 500)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const stats = [
    {
      icon: Mail,
      value: counts.emails.toLocaleString(),
      suffix: "+",
      label: "Emails Sent",
      sublabel: "This month",
      gradient: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      borderColor: "border-pink-200/50",
      iconColor: "text-pink-600",
    },
    {
      icon: TrendingUp,
      value: counts.responses,
      suffix: "%",
      label: "Response Rate",
      sublabel: "Above industry average",
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200/50",
      iconColor: "text-indigo-600",
    },
    {
      icon: Calendar,
      value: counts.interviews,
      suffix: "+",
      label: "Interviews Booked",
      sublabel: "For our users",
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200/50",
      iconColor: "text-emerald-600",
    },
    {
      icon: Users,
      value: counts.users,
      suffix: "+",
      label: "Active Users",
      sublabel: "Growing daily",
      gradient: "from-orange-500 to-amber-500",
      bgColor: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200/50",
      iconColor: "text-orange-600",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
            Trusted by Job Seekers Everywhere
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their job search with JobBuddy
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-gradient-to-br ${stat.bgColor} border-2 ${stat.borderColor} rounded-3xl p-8 backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5
                }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}{stat.suffix}
              </motion.div>
              <div className="text-gray-800 text-lg font-semibold">{stat.label}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Social Proof */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">Real-time job monitoring</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">95% email deliverability</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">24/7 automated outreach</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

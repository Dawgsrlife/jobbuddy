"use client"

import { Brain, Users, Clock, Shield, BarChart3, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Every email is crafted specifically for the role, company, and recipient using advanced AI that understands context and tone.",
      gradient: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      borderColor: "border-pink-200/50",
    },
    {
      icon: Users,
      title: "Smart Contact Discovery",
      description: "Automatically finds and verifies hiring managers and recruiters at your target companies with 95% accuracy.",
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200/50",
    },
    {
      icon: Clock,
      title: "24/7 Job Monitoring",
      description: "Continuously scans for new opportunities that match your profile and preferences across all major job boards.",
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200/50",
    },
    {
      icon: Shield,
      title: "Professional & Compliant",
      description: "All outreach follows industry best practices and includes proper opt-out mechanisms for maximum professionalism.",
      gradient: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      borderColor: "border-orange-200/50",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed insights on email performance, response rates, and interview conversion with actionable recommendations.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200/50",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Get notified immediately when someone responds, opens your email, or shows interest in your profile.",
      gradient: "from-yellow-500 to-amber-500",
      bgColor: "from-yellow-50 to-amber-50",
      borderColor: "border-yellow-200/50",
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
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
              Why JobBuddy
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Actually Works
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Skip the black hole of job portals. Reach decision-makers directly with{" "}
            <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              personalized, professional outreach
            </span>{" "}
            that gets results.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-gradient-to-br ${feature.bgColor} border-2 ${feature.borderColor} rounded-3xl p-8 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5
                }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Trust Elements */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2 bg-white/60 px-6 py-3 rounded-full shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">Active Job Monitoring</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-6 py-3 rounded-full shadow-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">AI-Powered Matching</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-6 py-3 rounded-full shadow-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">Professional Outreach</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

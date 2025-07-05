"use client"

import { useUser } from "@clerk/nextjs"
import { SignUpButton } from "@clerk/nextjs"
import { Upload, Target, Mail, BarChart3, ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function HowItWorksSection() {
  const { user, isLoaded } = useUser()

  const steps = [
    {
      icon: Upload,
      title: "Upload Your Profile",
      description: "Share your resume, skills, and job preferences. Our AI learns what makes you unique and builds your professional profile.",
      gradient: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      borderColor: "border-pink-200/50",
      delay: 0.1,
    },
    {
      icon: Target,
      title: "Choose Target Companies",
      description: "Select your dream companies from our database of 10,000+ organizations. Set preferences for role types and locations.",
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200/50",
      delay: 0.2,
    },
    {
      icon: Mail,
      title: "AI Sends Personalized Emails",
      description: "When relevant jobs appear, we craft and send professional emails to hiring managers with your personalized message.",
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200/50",
      delay: 0.3,
    },
    {
      icon: BarChart3,
      title: "Track & Optimize",
      description: "Monitor responses, book interviews, and continuously improve your outreach strategy with detailed analytics.",
      gradient: "from-orange-500 to-amber-500",
      bgColor: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200/50",
      delay: 0.4,
    },
  ]

  return (
    <section id="how-it-works" className="py-24 relative">
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
              How It
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
            Set it up once, then let JobBuddy work in the background while you focus on{" "}
            <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              preparing for interviews
            </span>
            .
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: step.delay }}
              viewport={{ once: true }}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-20 left-full w-full h-1 bg-gradient-to-r from-pink-300 via-indigo-300 to-purple-300 z-0 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: step.delay + 0.3 }}
                  viewport={{ once: true }}
                />
              )}

              <motion.div 
                className={`bg-gradient-to-br ${step.bgColor} border-2 ${step.borderColor} rounded-3xl p-8 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 relative z-10`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5
                  }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>

                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500 mb-2 bg-white/50 px-3 py-1 rounded-full inline-block">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-white/60 to-gray-50/60 rounded-3xl p-8 backdrop-blur-sm border-2 border-gray-200/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Why This Approach Works Better
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Traditional job applications have a 2-3% response rate. Our direct outreach approach achieves 15-20% response rates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-700 font-medium">Skip the applicant tracking systems</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-700 font-medium">Direct access to decision makers</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-700 font-medium">Personalized messaging that stands out</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {isLoaded && user ? (
            <motion.a
              href="/dashboard"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          ) : (
            <SignUpButton mode="modal">
              <motion.button 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </SignUpButton>
          )}
        </motion.div>
      </div>
    </section>
  )
}

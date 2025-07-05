"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Clock, CheckCircle, Zap } from "lucide-react"
import { SignUpButton } from "@clerk/nextjs"

export function FinalCTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-indigo-100 to-purple-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.1),transparent_40%)]" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300/30 to-rose-300/30 rounded-full blur-2xl"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-indigo-300/30 to-purple-300/30 rounded-full blur-2xl"
        animate={{ 
          y: [0, 15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100/80 to-indigo-100/80 border border-pink-200/50 rounded-full px-6 py-3 mb-8 backdrop-blur-sm shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-pink-500" />
            </motion.div>
            <span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
              🚀 Start Your Job Search Revolution
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
              Ready to Land Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Dream Job?
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of professionals who have accelerated their careers with JobBuddy's{" "}
            <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              AI-powered job search automation
            </span>
          </motion.p>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-white/80 to-gray-50/80 rounded-3xl p-8 md:p-12 backdrop-blur-sm border-2 border-gray-200/50 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Benefits */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Get Started in Under 5 Minutes
                </h3>
                
                <div className="space-y-4 mb-8">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring" as const, stiffness: 300 }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Upload your resume & set preferences</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring" as const, stiffness: 300 }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Choose your target companies</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring" as const, stiffness: 300 }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Let AI handle the outreach automatically</span>
                  </motion.div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Setup in 5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>Results in 24-48 hours</span>
                  </div>
                </div>
              </div>

              {/* Right side - CTA */}
              <div className="text-center lg:text-left">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    Start Free Today
                  </div>
                  <div className="text-gray-600">
                    No credit card required • Cancel anytime
                  </div>
                </div>

                <SignUpButton mode="modal">
                  <motion.button 
                    className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started Now - It's Free
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </SignUpButton>

                <div className="mt-4 text-sm text-gray-500">
                  Join 1,250+ professionals already using JobBuddy
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final Trust Indicators */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">✅ No spam, ever</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">🔒 Your data is secure</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">⚡ Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
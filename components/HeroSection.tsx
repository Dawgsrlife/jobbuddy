"use client"

import { useState } from "react"
import { ArrowRight, Sparkles, Target, Mail, Zap, Star, Rocket, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"
import { motion } from "framer-motion"

export function HeroSection() {
  const [email, setEmail] = useState("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
      {/* Hero Content */}
      <motion.div 
        className="container mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100/80 to-indigo-100/80 border border-pink-200/50 rounded-full px-6 py-3 mb-8 backdrop-blur-sm shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-pink-500" />
          </motion.div>
          <span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
            ✨ Your AI-Powered Job Search Assistant
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          variants={itemVariants}
        >
          <motion.span 
            className="block bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Land your
          </motion.span>
          <motion.span 
            className="block bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            dream job
          </motion.span>
          <motion.span 
            className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            faster than ever
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          JobBuddy finds relevant opportunities at your target companies and sends{" "}
          <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
            personalized cold emails
          </span>{" "}
          to hiring managers — automatically, professionally, and effectively
        </motion.p>

        {/* CTA Section */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="flex items-center bg-white/80 border-2 border-pink-200/50 rounded-2xl p-2 backdrop-blur-sm max-w-md w-full shadow-xl"
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
          >
            <input
              type="email"
              placeholder="Enter your email to get started"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none flex-1 px-4 py-2"
            />
            <SignUpButton mode="modal">
              <motion.button 
                className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </SignUpButton>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 text-sm mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="flex items-center gap-2 bg-green-100/80 px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-medium">98% Success Rate</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 bg-blue-100/80 px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-medium">10,000+ Emails Sent</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 bg-yellow-100/80 px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="text-yellow-700 font-medium">24/7 Automated</span>
          </motion.div>
        </motion.div>

        {/* Features Preview Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-white/60 border border-pink-200/30 rounded-3xl p-8 backdrop-blur-sm shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.2)" 
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Smart Targeting</h3>
            <p className="text-gray-600 leading-relaxed">Pick your dream companies. We monitor their job postings and find the perfect opportunities for you.</p>
          </motion.div>

          <motion.div 
            className="bg-white/60 border border-indigo-200/30 rounded-3xl p-8 backdrop-blur-sm shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.2)" 
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">AI Outreach</h3>
            <p className="text-gray-600 leading-relaxed">Personalized emails crafted by AI and sent directly to hiring managers and recruiters.</p>
          </motion.div>

          <motion.div 
            className="bg-white/60 border border-emerald-200/30 rounded-3xl p-8 backdrop-blur-sm shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.2)" 
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Fully Automated</h3>
            <p className="text-gray-600 leading-relaxed">Runs 24/7 in the background while you focus on interview prep and skill development.</p>
          </motion.div>
        </motion.div>

        {/* Floating Action Elements */}
        <motion.div
          className="absolute top-20 left-10 hidden lg:block"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-4 rounded-2xl shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        <motion.div
          className="absolute top-32 right-16 hidden lg:block"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <Rocket className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 hidden lg:block"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

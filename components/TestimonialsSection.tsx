"use client"

import { motion } from "framer-motion"
import { Star, Quote, MapPin, Briefcase } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      image: "/placeholder-user.jpg",
      content: "JobBuddy helped me land my dream job at Google in just 3 weeks! The personalized emails were so much better than generic applications. Got 5 interviews from 12 companies I targeted.",
      rating: 5,
      gradient: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      borderColor: "border-pink-200/50",
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Meta",
      location: "Austin, TX",
      image: "/placeholder-user.jpg",
      content: "The AI-powered outreach is incredible. I was getting responses from hiring managers within hours, not weeks. Finally escaped the black hole of job boards!",
      rating: 5,
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200/50",
    },
    {
      name: "Emily Johnson",
      role: "Data Scientist",
      company: "Netflix",
      location: "Remote",
      image: "/placeholder-user.jpg",
      content: "As someone who hates networking, JobBuddy was a game-changer. It handled all the outreach professionally while I focused on technical prep. Landed 3 offers!",
      rating: 5,
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200/50",
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
              Success Stories
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              From Real Users
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of professionals who have transformed their job search with{" "}
            <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              JobBuddy's AI-powered outreach
            </span>
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-gradient-to-br ${testimonial.bgColor} border-2 ${testimonial.borderColor} rounded-3xl p-8 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-20">
                <Quote className="w-12 h-12 text-gray-400" />
              </div>

              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 leading-relaxed mb-6">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </motion.div>
                <div>
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {testimonial.role} at {testimonial.company}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Social Proof */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-white/60 to-gray-50/60 rounded-3xl p-8 backdrop-blur-sm border-2 border-gray-200/50">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join the thousands of professionals who have accelerated their careers with JobBuddy's intelligent job search automation.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">Average 18% response rate</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">3-4 weeks to first offer</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">1000+ companies reached</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 
import { Brain, Users, Clock, Shield, BarChart3, Zap } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Every email is crafted specifically for the role, company, and recipient using advanced AI.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Contact Discovery",
      description: "Automatically finds hiring managers and recruiters at your target companies.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuously scans for new job postings that match your profile and preferences.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: "Professional & Compliant",
      description: "All outreach follows best practices and includes proper opt-out mechanisms.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Detailed analytics on email performance, response rates, and interview bookings.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Get notified immediately when someone responds or shows interest.",
      gradient: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why JobBuddy Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Skip the black hole of job portals. Reach decision-makers directly with personalized, professional outreach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

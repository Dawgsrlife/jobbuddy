import { JobCard } from "@/components/JobCard"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { StatsSection } from "@/components/StatsSection"
import { TestimonialsSection } from "@/components/TestimonialsSection"
import { FinalCTASection } from "@/components/FinalCTASection"
import { GlobalHeader } from "@/components/GlobalHeader"

// Dummy data for initial development
const dummyJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    url: "https://example.com/job1",
    description: "Build amazing user interfaces with React and TypeScript",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    url: "https://example.com/job2",
    description: "Work on both frontend and backend systems",
  },
  {
    id: "3",
    title: "Software Engineer Intern",
    company: "BigTech Inc",
    location: "Seattle, WA",
    url: "https://example.com/job3",
    description: "Summer internship program for students",
  },
  {
    id: "4",
    title: "React Developer",
    company: "WebAgency",
    location: "New York, NY",
    url: "https://example.com/job4",
    description: "Create responsive web applications",
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "DataCorp",
    location: "Austin, TX",
    url: "https://example.com/job5",
    description: "Build scalable API services",
  },
  {
    id: "6",
    title: "Mobile Developer",
    company: "AppStudio",
    location: "Los Angeles, CA",
    url: "https://example.com/job6",
    description: "Develop cross-platform mobile applications",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-indigo-100 text-gray-900 overflow-hidden">
      {/* Global Header */}
      <GlobalHeader />
      
      {/* Beautiful Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200/30 via-blue-200/30 to-indigo-200/30" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_40%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.1),transparent_40%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(59,130,246,0.08),transparent_50%)]" />

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Authenticated users will be redirected by OnboardingRedirect component */}
      {/* This content is only shown to unauthenticated users */}
      
      {/* Hero Section */}
      <HeroSection />

      {/* Container */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Stats Section */}
        <StatsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Final CTA Section */}
        <FinalCTASection />
      </div>
    </div>
  )
}

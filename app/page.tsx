import { JobCard } from "@/components/JobCard"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { StatsSection } from "@/components/StatsSection"

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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      {/* Hero Section */}
      <HeroSection />

      {/* Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <StatsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {dummyJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              url={job.url}
              description={job.description}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

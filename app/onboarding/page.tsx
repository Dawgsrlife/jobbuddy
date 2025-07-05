"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { 
  User, 
  Mail, 
  Briefcase, 
  Code, 
  Clock, 
  Building2, 
  Upload, 
  ArrowRight, 
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserProfile {
  name: string
  email: string
  profession: string
  skills: string[]
  experience: number
  preferredCompanies: string[]
  resumeUrl?: string
}

export default function OnboardingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSkipWarning, setShowSkipWarning] = useState(false)
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    profession: "",
    skills: [],
    experience: 0,
    preferredCompanies: [],
    resumeUrl: ""
  })

  const [tempSkills, setTempSkills] = useState("")
  const [tempCompanies, setTempCompanies] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!user) {
    router.push("/")
    return null
  }

  const handleProfileUpdate = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleSkillsChange = (skillsString: string) => {
    setTempSkills(skillsString)
    const skillsArray = skillsString.split(",").map(skill => skill.trim()).filter(skill => skill.length > 0)
    handleProfileUpdate("skills", skillsArray)
  }

  const handleCompaniesChange = (companiesString: string) => {
    setTempCompanies(companiesString)
    const companiesArray = companiesString.split(",").map(company => company.trim()).filter(company => company.length > 0)
    handleProfileUpdate("preferredCompanies", companiesArray)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setResumeFile(file)
      // In a real app, you'd upload to cloud storage and get URL
      handleProfileUpdate("resumeUrl", URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call to save profile
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real app, you'd save to database
    localStorage.setItem("userProfile", JSON.stringify(profile))
    localStorage.setItem("profileCompleted", "true")
    
    setIsSubmitting(false)
    router.push("/dashboard")
  }

  const handleSkip = () => {
    setShowSkipWarning(true)
  }

  const confirmSkip = () => {
    localStorage.setItem("profileCompleted", "false")
    router.push("/dashboard")
  }

  const steps = [
    {
      number: 1,
      title: "Basic Information",
      description: "Tell us about yourself"
    },
    {
      number: 2,
      title: "Professional Details",
      description: "Your skills and experience"
    },
    {
      number: 3,
      title: "Preferences",
      description: "Companies and resume"
    }
  ]

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name" className="flex items-center gap-2 text-white">
          <User className="w-4 h-4" />
          Full Name *
        </Label>
        <Input
          id="name"
          value={profile.name}
          onChange={(e) => handleProfileUpdate("name", e.target.value)}
          placeholder="Enter your full name"
          className="mt-2 bg-white/5 border-white/10 text-white placeholder-gray-400"
        />
      </div>

      <div>
        <Label htmlFor="email" className="flex items-center gap-2 text-white">
          <Mail className="w-4 h-4" />
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          value={profile.email}
          onChange={(e) => handleProfileUpdate("email", e.target.value)}
          placeholder="your.email@example.com"
          className="mt-2 bg-white/5 border-white/10 text-white placeholder-gray-400"
        />
      </div>

      <div>
        <Label htmlFor="profession" className="flex items-center gap-2 text-white">
          <Briefcase className="w-4 h-4" />
          Profession *
        </Label>
        <Input
          id="profession"
          value={profile.profession}
          onChange={(e) => handleProfileUpdate("profession", e.target.value)}
          placeholder="e.g., Software Engineer, Product Manager"
          className="mt-2 bg-white/5 border-white/10 text-white placeholder-gray-400"
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="skills" className="flex items-center gap-2 text-white">
          <Code className="w-4 h-4" />
          Skills *
        </Label>
        <Textarea
          id="skills"
          value={tempSkills}
          onChange={(e) => handleSkillsChange(e.target.value)}
          placeholder="JavaScript, React, TypeScript, Node.js (comma-separated)"
          className="mt-2 bg-white/5 border-white/10 text-white placeholder-gray-400"
          rows={3}
        />
        <p className="text-sm text-gray-400 mt-1">
          List your key skills separated by commas
        </p>
      </div>

      <div>
        <Label htmlFor="experience" className="flex items-center gap-2 text-white">
          <Clock className="w-4 h-4" />
          Years of Experience *
        </Label>
        <Select value={profile.experience.toString()} onValueChange={(value) => handleProfileUpdate("experience", parseInt(value))}>
          <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-white/10">
            <SelectItem value="0">0-1 years (Entry Level)</SelectItem>
            <SelectItem value="2">2-3 years (Junior)</SelectItem>
            <SelectItem value="4">4-6 years (Mid-Level)</SelectItem>
            <SelectItem value="7">7-10 years (Senior)</SelectItem>
            <SelectItem value="11">10+ years (Expert)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="companies" className="flex items-center gap-2 text-white">
          <Building2 className="w-4 h-4" />
          Preferred Companies (Optional)
        </Label>
        <Textarea
          id="companies"
          value={tempCompanies}
          onChange={(e) => handleCompaniesChange(e.target.value)}
          placeholder="Google, Stripe, Vercel (comma-separated)"
          className="mt-2 bg-white/5 border-white/10 text-white placeholder-gray-400"
          rows={3}
        />
        <p className="text-sm text-gray-400 mt-1">
          Companies you'd like to work for
        </p>
      </div>

      <div>
        <Label htmlFor="resume" className="flex items-center gap-2 text-white">
          <Upload className="w-4 h-4" />
          Resume Upload (Optional)
        </Label>
        <div className="mt-2">
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="resume"
            className="block w-full p-4 border-2 border-dashed border-white/20 rounded-lg text-center cursor-pointer hover:border-white/40 transition-colors"
          >
            {resumeFile ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">{resumeFile.name}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">Click to upload resume (PDF, DOC, DOCX)</span>
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return profile.name && profile.email && profile.profession
      case 2:
        return profile.skills.length > 0 && profile.experience > 0
      case 3:
        return true // Step 3 is optional
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Complete Your Profile</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Help us find the perfect jobs for you by sharing your professional details
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.number
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      currentStep > step.number ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">{steps[currentStep - 1].title}</h2>
          <p className="text-gray-400">{steps[currentStep - 1].description}</p>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Back
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Skip for Now
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </div>
                  ) : currentStep === 3 ? (
                    "Complete Setup"
                  ) : (
                    <div className="flex items-center gap-2">
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skip Warning Modal */}
      {showSkipWarning && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold">Skip Profile Setup?</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Without a complete profile, job matching will be limited and personalized features won't work optimally.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowSkipWarning(false)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Continue Setup
              </Button>
              <Button
                onClick={confirmSkip}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
              >
                Skip Anyway
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
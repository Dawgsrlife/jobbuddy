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
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CreatableSelect from "react-select/creatable"
import { MultiValue, ActionMeta } from "react-select"
import { useEffect } from "react"

interface UserProfile {
  name: string
  email: string
  profession: string
  skills: string[]
  experience: number
  preferredCompanies: string[]
  resumeUrl?: string
}

interface Option {
  value: string
  label: string
}

export default function OnboardingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    profession: "",
    skills: [],
    experience: 0,
    preferredCompanies: [],
    resumeUrl: ""
  })

  // Pre-populate user data from Clerk
  useEffect(() => {
    if (user && isLoaded) {
      setProfile(prev => ({
        ...prev,
        name: user.fullName || prev.name,
        email: user.emailAddresses[0]?.emailAddress || prev.email,
      }))
    }
  }, [user, isLoaded])

  const [skillsOptions, setSkillsOptions] = useState<Option[]>([])
  const [companiesOptions, setCompaniesOptions] = useState<Option[]>([])
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

  const handleSkillsChange = (selectedOptions: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
    const skills = selectedOptions.map(option => option.value)
    handleProfileUpdate("skills", skills)
    setSkillsOptions([...selectedOptions])
  }

  const handleCompaniesChange = (selectedOptions: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
    const companies = selectedOptions.map(option => option.value)
    handleProfileUpdate("preferredCompanies", companies)
    setCompaniesOptions([...selectedOptions])
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setResumeFile(file)
      
      // Upload to Supabase storage
      try {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await fetch('/api/resume/upload', {
          method: 'POST',
          body: formData,
        })
        
        const data = await response.json()
        
        if (data.success) {
          handleProfileUpdate("resumeUrl", data.resumeUrl)
        } else {
          console.error('Resume upload failed:', data.error)
          // Keep local file for display purposes
          handleProfileUpdate("resumeUrl", URL.createObjectURL(file))
        }
      } catch (error) {
        console.error('Resume upload error:', error)
        // Keep local file for display purposes
        handleProfileUpdate("resumeUrl", URL.createObjectURL(file))
      }
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError("")
    
    // Validate required fields
    if (!profile.name.trim() || !profile.email.trim() || !profile.profession.trim() || !profile.experience) {
      setSubmitError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    try {
      console.log('Submitting onboarding data:', {
        name: profile.name,
        email: profile.email,
        profession: profile.profession,
        experience: profile.experience,
        skillsCount: profile.skills.length,
        companiesCount: profile.preferredCompanies.length
      })

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          profession: profile.profession,
          experience: profile.experience,
          skills: profile.skills,
          preferredCompanies: profile.preferredCompanies,
          resumeUrl: profile.resumeUrl,
        }),
      })

      let data
      if (response.ok) {
        data = await response.json()
        console.log('Onboarding response:', data)
      } else {
        // Try to get error message from response
        try {
          const errorData = await response.json()
          console.error('Onboarding error response:', errorData)
          setSubmitError(errorData.error || errorData.details || 'Failed to save profile')
        } catch {
          const text = await response.text()
          console.error('Onboarding error text:', text)
          setSubmitError(text || 'An unknown error occurred. Please try again later.')
        }
        setIsSubmitting(false)
        return
      }

      if (data.success) {
        console.log('Profile saved successfully, redirecting to dashboard')
        localStorage.setItem("profileCompleted", "true")
        setIsSubmitting(false)
        router.push("/dashboard")
      } else {
        console.error('Onboarding failed:', data)
        setSubmitError(data.error || 'Failed to save profile')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Onboarding network error:', error)
      setSubmitError('Network error. Please check your connection and try again.')
      setIsSubmitting(false)
    }
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
        <div className="mt-2">
          <CreatableSelect
            isMulti
            value={skillsOptions}
            onChange={handleSkillsChange}
            placeholder="Type to add skills (e.g., JavaScript, React, TypeScript)"
            className="text-black"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: 'rgb(17, 24, 39)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: 'white',
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                },
              }),
              input: (provided) => ({
                ...provided,
                color: 'white',
              }),
              placeholder: (provided) => ({
                ...provided,
                color: 'rgba(156, 163, 175)',
              }),
            }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Add your key skills. You can type to create new ones.
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
          Preferred Companies *
        </Label>
        <div className="mt-2">
          <CreatableSelect
            isMulti
            value={companiesOptions}
            onChange={handleCompaniesChange}
            placeholder="Type to add companies (e.g., Google, Stripe, Vercel)"
            className="text-black"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: 'rgb(17, 24, 39)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: 'rgba(147, 51, 234, 0.2)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: 'white',
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                },
              }),
              input: (provided) => ({
                ...provided,
                color: 'white',
              }),
              placeholder: (provided) => ({
                ...provided,
                color: 'rgba(156, 163, 175)',
              }),
            }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Companies you'd like to work for. You can type to add new ones.
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
        return profile.name.trim() && profile.email.trim() && profile.profession.trim()
      case 2:
        return profile.skills.length > 0 && profile.experience > 0
      case 3:
        return profile.preferredCompanies.length > 0 // At least one company is required
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to JobBuddy
          </h1>
          <p className="text-xl text-gray-300 mb-8">Let's set up your profile to get started</p>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center gap-8 mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.number 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                    : "bg-white/10 text-gray-400"
                }`}>
                  {step.number}
                </div>
                <div className="text-left">
                  <div className={`font-medium ${currentStep >= step.number ? "text-white" : "text-gray-400"}`}>
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-500 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            {renderCurrentStep()}
            
            {/* Error Display */}
            {submitError && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
              >
                Back
              </Button>
              
              <div className="flex gap-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i + 1 <= currentStep ? "bg-blue-500" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </div>
                ) : currentStep === 3 ? (
                  "Complete Setup"
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
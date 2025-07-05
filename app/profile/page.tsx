"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { 
  User, 
  Mail, 
  Briefcase, 
  Code, 
  Clock, 
  Building2, 
  Upload, 
  Download,
  Edit,
  Save,
  X,
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

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadUserProfile()
    }
  }, [user])

  const loadUserProfile = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/onboarding')
      const data = await response.json()
      
      if (data.success && data.profile) {
        const userProfile = {
          name: data.profile.name,
          email: data.profile.email,
          profession: data.profile.profession,
          skills: data.profile.skills?.map((s: any) => s.skill) || [],
          experience: data.profile.experience,
          preferredCompanies: data.profile.preferredCompanies?.map((c: any) => c.companyName) || [],
          resumeUrl: data.profile.resumeUrl || ""
        }
        setProfile(userProfile)
        setTempSkills(userProfile.skills.join(", "))
        setTempCompanies(userProfile.preferredCompanies.join(", "))
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
          <p className="text-gray-400">You need to be authenticated to view this page.</p>
        </div>
      </div>
    )
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

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
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

      const data = await response.json()
      
      if (data.success) {
        // Reload the profile data to ensure it's in sync
        await loadUserProfile()
        setIsEditing(false)
      } else {
        console.error('Error saving profile:', data.error)
        alert('Failed to save profile. Please try again.')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = async () => {
    // Reload original profile from database
    await loadUserProfile()
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />

      <DashboardHeader />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-gray-400">Manage your personal information and preferences</p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </div>
                  )}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 text-white">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => handleProfileUpdate("name", e.target.value)}
                    disabled={!isEditing}
                    className="mt-2 bg-white/5 border-white/10 text-white placeholder-gray-400 disabled:opacity-50"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-white">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileUpdate("email", e.target.value)}
                    disabled={!isEditing}
                    className="mt-2 bg-white/5 border-white/10 text-white placeholder-gray-400 disabled:opacity-50"
                  />
                </div>

                <div>
                  <Label htmlFor="profession" className="flex items-center gap-2 text-white">
                    <Briefcase className="w-4 h-4" />
                    Profession
                  </Label>
                  <Input
                    id="profession"
                    value={profile.profession}
                    onChange={(e) => handleProfileUpdate("profession", e.target.value)}
                    disabled={!isEditing}
                    className="mt-2 bg-white/5 border-white/10 text-white placeholder-gray-400 disabled:opacity-50"
                  />
                </div>

                <div>
                  <Label htmlFor="experience" className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4" />
                    Years of Experience
                  </Label>
                  <Select 
                    value={profile.experience.toString()} 
                    onValueChange={(value) => handleProfileUpdate("experience", parseInt(value))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white disabled:opacity-50">
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
            </div>

            {/* Skills */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Skills
              </h2>
              
              <div>
                <Label htmlFor="skills" className="text-white mb-2 block">
                  Key Skills
                </Label>
                <Textarea
                  id="skills"
                  value={tempSkills}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  disabled={!isEditing}
                  placeholder="JavaScript, React, TypeScript, Node.js (comma-separated)"
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 disabled:opacity-50"
                  rows={4}
                />
                <p className="text-sm text-gray-400 mt-2">
                  List your key skills separated by commas
                </p>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Job Preferences
              </h2>
              
              <div>
                <Label htmlFor="companies" className="text-white mb-2 block">
                  Preferred Companies
                </Label>
                <Textarea
                  id="companies"
                  value={tempCompanies}
                  onChange={(e) => handleCompaniesChange(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Google, Stripe, Vercel (comma-separated)"
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 disabled:opacity-50"
                  rows={3}
                />
                <p className="text-sm text-gray-400 mt-2">
                  Companies you'd like to work for
                </p>
              </div>
            </div>
          </div>

          {/* Resume Section */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Resume
              </h2>
              
              {profile.resumeUrl ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Resume uploaded</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Replace
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No resume uploaded</p>
                  {isEditing && (
                    <div>
                      <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        Upload Resume
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Completion */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Profile Completion</h3>
              
              <div className="space-y-3">
                {[
                  { label: "Basic Information", completed: !!(profile.name && profile.email && profile.profession) },
                  { label: "Skills", completed: profile.skills.length > 0 },
                  { label: "Experience", completed: profile.experience > 0 },
                  { label: "Resume", completed: !!profile.resumeUrl }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{item.label}</span>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      item.completed ? "bg-green-400" : "bg-gray-400"
                    }`}>
                      {item.completed && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-sm text-gray-400 mb-1">Completion</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${[
                        !!(profile.name && profile.email && profile.profession),
                        profile.skills.length > 0,
                        profile.experience > 0,
                        !!profile.resumeUrl
                      ].filter(Boolean).length * 25}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
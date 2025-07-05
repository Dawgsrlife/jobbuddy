export interface Job {
  id: string
  title: string
  company: string
  location: string
  url: string
  description?: string
  salary?: string
  postedDate?: string
  requirements?: string[]
  benefits?: string[]
}

export interface ResumeData {
  fullName: string
  email: string
  phone: string
  location: string
  skills: string[]
  experience: string[]
  education: string[]
  summary?: string
}

export interface ApplicationData {
  jobId: string
  applicantName: string
  email: string
  phone: string
  location: string
  coverLetter: string
  resumeFile?: File
  submittedAt: Date
}

export interface SearchFilters {
  profession: string
  location?: string
  salaryMin?: number
  salaryMax?: number
  experienceLevel?: "entry" | "mid" | "senior"
  remote?: boolean
}

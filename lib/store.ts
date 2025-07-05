import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
  name: string
  email: string
  profession: string
  skills: string[]
  experience: number
  preferredCompanies: string[]
  resumeUrl?: string
}

interface ApplicationState {
  // User Profile
  profile: UserProfile | null
  profileCompleted: boolean
  
  // Job Applications
  applications: any[]
  
  // Email Outreach
  emails: any[]
  
  // Actions
  setProfile: (profile: UserProfile) => void
  setProfileCompleted: (completed: boolean) => void
  addApplication: (application: any) => void
  addEmail: (email: any) => void
  updateEmail: (id: string, updates: any) => void
  deleteEmail: (id: string) => void
}

export const useAppStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: null,
      profileCompleted: false,
      applications: [],
      emails: [],
      
      // Actions
      setProfile: (profile) => set({ profile }),
      setProfileCompleted: (completed) => set({ profileCompleted: completed }),
      
      addApplication: (application) => 
        set((state) => ({ 
          applications: [...state.applications, application] 
        })),
      
      addEmail: (email) => 
        set((state) => ({ 
          emails: [...state.emails, email] 
        })),
      
      updateEmail: (id, updates) =>
        set((state) => ({
          emails: state.emails.map(email => 
            email.id === id ? { ...email, ...updates } : email
          )
        })),
      
      deleteEmail: (id) =>
        set((state) => ({
          emails: state.emails.filter(email => email.id !== id)
        })),
    }),
    {
      name: 'jobbuddy-store',
      partialize: (state) => ({
        profile: state.profile,
        profileCompleted: state.profileCompleted,
        applications: state.applications,
        emails: state.emails,
      }),
    }
  )
) 
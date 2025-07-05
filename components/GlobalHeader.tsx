"use client"

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser
} from '@clerk/nextjs'
import { UserProfileDropdown } from './UserProfileDropdown'
import { useRouter } from 'next/navigation'

export function GlobalHeader() {
  const { user } = useUser()
  const router = useRouter()

  const handleLogoClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
              JobBuddy
            </span>
          </button>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100/50">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserProfileDropdown />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
} 
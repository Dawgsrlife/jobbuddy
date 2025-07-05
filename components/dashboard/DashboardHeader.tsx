"use client"

import { Target, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "./DashboardNav"
import { UserProfileDropdown } from "../UserProfileDropdown"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
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
    <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                JobBuddy
              </h1>
              <div className="text-xs text-gray-500">Dashboard</div>
            </div>
          </button>

          {/* Navigation */}
          <div className="relative">
            <DashboardNav />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400 font-medium">Agent Active</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Settings className="w-4 h-4" />
            </Button>
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  )
}

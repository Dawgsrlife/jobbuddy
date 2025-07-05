"use client"

import { useState, useRef, useEffect } from "react"
import { useUser, useClerk } from "@clerk/nextjs"
import { User, Settings, LogOut, ChevronDown, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UserProfileDropdown() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName || "User"}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <span className="hidden md:block text-sm font-medium">
          {user.firstName || user.emailAddresses[0]?.emailAddress}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl z-50">
          {/* User Info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">
                  {user.fullName || "User"}
                </p>
                <p className="text-gray-400 text-sm truncate">
                  {user.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10"
              onClick={() => {
                setIsOpen(false)
                window.location.href = "/profile"
              }}
            >
              <User className="w-4 h-4 mr-3" />
              Profile
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10"
              onClick={() => {
                setIsOpen(false)
                window.location.href = "/dashboard"
              }}
            >
              <Settings className="w-4 h-4 mr-3" />
              Dashboard
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10"
              onClick={() => {
                setIsOpen(false)
                // Add notification functionality here
              }}
            >
              <Bell className="w-4 h-4 mr-3" />
              Notifications
            </Button>
          </div>

          {/* Sign Out */}
          <div className="p-2 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 
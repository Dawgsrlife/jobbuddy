import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { uploadResume, deleteResume } from "@/lib/storage"
import { prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: "Invalid file type. Only PDF, DOC, and DOCX files are allowed." 
      }, { status: 400 })
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: "File too large. Maximum size is 10MB." 
      }, { status: 400 })
    }

    // Get user profile to check for existing resume
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkUserId: userId }
    })

    // If user has an existing resume, delete it first
    if (userProfile?.resumeUrl) {
      try {
        await deleteResume(userProfile.resumeUrl)
      } catch (error) {
        console.warn('Failed to delete old resume:', error)
        // Continue with upload even if deletion fails
      }
    }

    // Upload new resume
    const uploadResult = await uploadResume(file, userId)

    if (!uploadResult.success) {
      return NextResponse.json({ 
        error: uploadResult.error || "Failed to upload resume" 
      }, { status: 500 })
    }

    // Update user profile with new resume URL
    const updatedProfile = await prisma.userProfile.upsert({
      where: { clerkUserId: userId },
      update: { resumeUrl: uploadResult.url },
      create: {
        clerkUserId: userId,
        email: "", // Will be updated later
        name: "", // Will be updated later
        profession: "",
        experience: 0,
        resumeUrl: uploadResult.url,
        isProfileComplete: false
      }
    })

    return NextResponse.json({ 
      success: true, 
      resumeUrl: uploadResult.url,
      message: "Resume uploaded successfully"
    })

  } catch (error: any) {
    console.error('Resume upload error:', error)
    return NextResponse.json({ 
      error: "Failed to upload resume", 
      details: error.message 
    }, { status: 500 })
  }
} 
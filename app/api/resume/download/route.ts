import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { downloadResume, getResumeFileInfo } from "@/lib/storage"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile to get resume URL
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkUserId: userId }
    })

    if (!userProfile?.resumeUrl) {
      return NextResponse.json({ error: "No resume found" }, { status: 404 })
    }

    // Download resume from Supabase storage
    const downloadResult = await downloadResume(userProfile.resumeUrl)

    if (!downloadResult.success || !downloadResult.blob) {
      return NextResponse.json({ 
        error: downloadResult.error || "Failed to download resume" 
      }, { status: 500 })
    }

    // Get file info for proper filename
    const fileInfo = getResumeFileInfo(userProfile.resumeUrl)
    const fileName = fileInfo?.fileName || 'resume.pdf'

    // Create response with file blob
    const response = new NextResponse(downloadResult.blob)
    
    // Set appropriate headers
    response.headers.set('Content-Type', 'application/octet-stream')
    response.headers.set('Content-Disposition', `attachment; filename="${fileName}"`)
    response.headers.set('Cache-Control', 'no-cache')

    return response

  } catch (error: any) {
    console.error('Resume download error:', error)
    return NextResponse.json({ 
      error: "Failed to download resume", 
      details: error.message 
    }, { status: 500 })
  }
} 
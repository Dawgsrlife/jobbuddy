import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, profession, experience, skills, preferredCompanies, resumeUrl } = body

    // Check if profile already exists
    const existingProfile = await prisma.userProfile.findUnique({
      where: { clerkUserId: userId }
    })

    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await prisma.userProfile.update({
        where: { clerkUserId: userId },
        data: {
          name,
          email,
          profession,
          experience,
          resumeUrl,
          isProfileComplete: true,
          skills: {
            deleteMany: {},
            create: skills.map((skill: string) => ({ skill }))
          },
          preferredCompanies: {
            deleteMany: {},
            create: preferredCompanies.map((company: string) => ({ companyName: company }))
          }
        },
        include: {
          skills: true,
          preferredCompanies: true,
        }
      })

      return NextResponse.json({ 
        success: true, 
        profile: updatedProfile 
      })
    } else {
      // Create new profile
      const newProfile = await prisma.userProfile.create({
        data: {
          clerkUserId: userId,
          name,
          email,
          profession,
          experience,
          resumeUrl,
          isProfileComplete: true,
          skills: {
            create: skills.map((skill: string) => ({ skill }))
          },
          preferredCompanies: {
            create: preferredCompanies.map((company: string) => ({ companyName: company }))
          }
        },
        include: {
          skills: true,
          preferredCompanies: true,
        }
      })

      return NextResponse.json({ 
        success: true, 
        profile: newProfile 
      })
    }
  } catch (error) {
    console.error('Onboarding API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.userProfile.findUnique({
      where: { clerkUserId: userId },
      include: {
        skills: true,
        preferredCompanies: true,
      }
    })

    return NextResponse.json({ 
      success: true, 
      profile,
      isComplete: profile?.isProfileComplete ?? false
    })
  } catch (error) {
    console.error('Get profile API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
} 
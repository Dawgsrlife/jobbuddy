import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, profession, experience, skills, preferredCompanies, resumeUrl } = body;

    // Validate required fields
    if (!name || !email || !profession || experience === undefined) {
      return NextResponse.json({ 
        error: "Missing required fields", 
        details: "Name, email, profession, and experience are required" 
      }, { status: 400 });
    }

    // Validate arrays
    const validSkills = Array.isArray(skills) ? skills.filter(skill => skill && skill.trim()) : [];
    const validCompanies = Array.isArray(preferredCompanies) ? preferredCompanies.filter(company => company && company.trim()) : [];

    console.log('Creating/updating profile for user:', userId);
    console.log('Profile data:', { name, email, profession, experience, skillsCount: validSkills.length, companiesCount: validCompanies.length });

    const profile = await prisma.userProfile.upsert({
      where: { clerkUserId: userId },
      update: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        profession: profession.trim(),
        experience: parseInt(experience.toString()),
        resumeUrl: resumeUrl || null,
        isProfileComplete: true,
        skills: { 
          deleteMany: {},
          create: validSkills.map((skill: string) => ({ skill: skill.trim() }))
        },
        preferredCompanies: { 
          deleteMany: {},
          create: validCompanies.map((company: string) => ({ companyName: company.trim() }))
        }
      },
      create: {
        clerkUserId: userId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        profession: profession.trim(),
        experience: parseInt(experience.toString()),
        resumeUrl: resumeUrl || null,
        isProfileComplete: true,
        skills: { 
          create: validSkills.map((skill: string) => ({ skill: skill.trim() }))
        },
        preferredCompanies: { 
          create: validCompanies.map((company: string) => ({ companyName: company.trim() }))
        }
      },
      include: { 
        skills: true, 
        preferredCompanies: true 
      }
    });

    console.log('Profile saved successfully:', profile.id);
    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    console.error('Onboarding POST error:', error);
    return NextResponse.json({ 
      error: "Failed to save profile", 
      details: error.message || "Unknown database error"
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Fetching profile for user:', userId);

    const profile = await prisma.userProfile.findUnique({
      where: { clerkUserId: userId },
      include: {
        skills: true,
        preferredCompanies: true,
      }
    })

    console.log('Profile found:', profile ? 'Yes' : 'No');
    
    if (profile) {
      console.log('Profile details:', {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        profession: profile.profession,
        isComplete: profile.isProfileComplete,
        skillsCount: profile.skills.length,
        companiesCount: profile.preferredCompanies.length
      });
    }

    return NextResponse.json({ 
      success: true, 
      profile,
      isComplete: profile?.isProfileComplete ?? false
    })
  } catch (error: any) {
    console.error('Get profile API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error.message || 'Unknown database error'
      }, 
      { status: 500 }
    )
  }
} 
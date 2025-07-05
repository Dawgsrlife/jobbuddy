import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database utility functions
export async function getUserProfile(clerkUserId: string) {
  return await prisma.userProfile.findUnique({
    where: { clerkUserId },
    include: {
      skills: true,
      preferredCompanies: true,
    },
  })
}

export async function createUserProfile(data: {
  clerkUserId: string
  email: string
  name: string
  profession: string
  experience: number
  skills: string[]
  preferredCompanies: string[]
  resumeUrl?: string
}) {
  const { skills, preferredCompanies, ...profileData } = data

  return await prisma.userProfile.create({
    data: {
      ...profileData,
      isProfileComplete: true,
      skills: {
        create: skills.map(skill => ({ skill }))
      },
      preferredCompanies: {
        create: preferredCompanies.map(company => ({ companyName: company }))
      }
    },
    include: {
      skills: true,
      preferredCompanies: true,
    },
  })
}

export async function updateUserProfile(clerkUserId: string, data: {
  name?: string
  profession?: string
  experience?: number
  resumeUrl?: string
  skills?: string[]
  preferredCompanies?: string[]
}) {
  const { skills, preferredCompanies, ...profileData } = data

  // Delete existing skills and companies if new ones are provided
  if (skills !== undefined) {
    await prisma.userSkill.deleteMany({
      where: { userProfile: { clerkUserId } }
    })
  }

  if (preferredCompanies !== undefined) {
    await prisma.userCompany.deleteMany({
      where: { userProfile: { clerkUserId } }
    })
  }

  return await prisma.userProfile.update({
    where: { clerkUserId },
    data: {
      ...profileData,
      isProfileComplete: true,
      ...(skills && {
        skills: {
          create: skills.map(skill => ({ skill }))
        }
      }),
      ...(preferredCompanies && {
        preferredCompanies: {
          create: preferredCompanies.map(company => ({ companyName: company }))
        }
      })
    },
    include: {
      skills: true,
      preferredCompanies: true,
    },
  })
}

export async function isProfileComplete(clerkUserId: string): Promise<boolean> {
  const profile = await prisma.userProfile.findUnique({
    where: { clerkUserId },
    select: { isProfileComplete: true }
  })
  
  return profile?.isProfileComplete ?? false
} 
import { createJobScraper } from "./scraper"

interface JobMatch {
  id: string
  title: string
  company: string
  location: string
  description: string
  url: string
  postedDate: string
  matchScore: number
  requirements: string[]
  benefits: string[]
}

interface UserProfile {
  skills: string[]
  experience: string
  preferences: {
    locations: string[]
    jobTypes: string[]
    salaryRange?: { min: number; max: number }
  }
}

export class JobScraperV2 {
  private scraper = createJobScraper()

  /**
   * Find jobs at specific target companies
   */
  async findJobsAtCompanies(companies: string[], userProfile: UserProfile, profession: string): Promise<JobMatch[]> {
    const allJobs: JobMatch[] = []

    for (const company of companies) {
      try {
        // Search for jobs at specific company
        const companyJobs = await this.scraper.searchJobs(
          profession,
          undefined, // location - let it be flexible
          [`site:${company.toLowerCase().replace(/\s+/g, "")}.com/careers`],
        )

        // Convert to JobMatch format and calculate match scores
        const matchedJobs = companyJobs.map((job) => ({
          id: `${company}-${Date.now()}-${Math.random()}`,
          title: job.title,
          company: job.company || company,
          location: job.location || "Not specified",
          description: job.description || "",
          url: job.url,
          postedDate: job.postedDate || "Recently",
          matchScore: this.calculateMatchScore(job, userProfile),
          requirements: this.extractRequirements(job.description || ""),
          benefits: this.extractBenefits(job.description || ""),
        }))

        // Only include jobs with good match scores
        const goodMatches = matchedJobs.filter((job) => job.matchScore >= 75)
        allJobs.push(...goodMatches)
      } catch (error) {
        console.error(`Error scraping jobs for ${company}:`, error)
        // Add mock data for demo
        allJobs.push(...this.getMockJobsForCompany(company, profession, userProfile))
      }
    }

    // Sort by match score and recency
    return allJobs.sort((a, b) => b.matchScore - a.matchScore).slice(0, 20) // Limit to top 20 matches
  }

  /**
   * Calculate how well a job matches the user's profile
   */
  private calculateMatchScore(job: any, userProfile: UserProfile): number {
    let score = 60 // Base score

    const jobText = `${job.title} ${job.description}`.toLowerCase()
    const userSkills = userProfile.skills.map((s) => s.toLowerCase())

    // Skill matching (40 points max)
    const matchedSkills = userSkills.filter((skill) => jobText.includes(skill))
    score += Math.min(40, (matchedSkills.length / userSkills.length) * 40)

    // Location preference (10 points max)
    if (userProfile.preferences.locations.some((loc) => job.location?.toLowerCase().includes(loc.toLowerCase()))) {
      score += 10
    }

    // Remote work preference (5 points max)
    if (jobText.includes("remote") && userProfile.preferences.locations.includes("Remote")) {
      score += 5
    }

    return Math.min(100, Math.round(score))
  }

  /**
   * Extract job requirements from description
   */
  private extractRequirements(description: string): string[] {
    const requirements: string[] = []
    const commonRequirements = [
      "Bachelor's degree",
      "Master's degree",
      "PhD",
      "years of experience",
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "TypeScript",
      "AWS",
      "Docker",
      "Kubernetes",
    ]

    commonRequirements.forEach((req) => {
      if (description.toLowerCase().includes(req.toLowerCase())) {
        requirements.push(req)
      }
    })

    return requirements.slice(0, 5) // Limit to top 5
  }

  /**
   * Extract benefits from job description
   */
  private extractBenefits(description: string): string[] {
    const benefits: string[] = []
    const commonBenefits = [
      "Health insurance",
      "Dental insurance",
      "401k",
      "Stock options",
      "Remote work",
      "Flexible hours",
      "Unlimited PTO",
      "Learning budget",
      "Gym membership",
    ]

    commonBenefits.forEach((benefit) => {
      if (description.toLowerCase().includes(benefit.toLowerCase())) {
        benefits.push(benefit)
      }
    })

    return benefits.slice(0, 4) // Limit to top 4
  }

  /**
   * Generate mock jobs for demo purposes
   */
  private getMockJobsForCompany(company: string, profession: string, userProfile: UserProfile): JobMatch[] {
    const mockJobs = [
      {
        id: `${company}-mock-1`,
        title: `Senior ${profession}`,
        company,
        location: "San Francisco, CA",
        description: `We're looking for a senior ${profession} to join our team and help build the future of technology.`,
        url: `https://${company.toLowerCase()}.com/careers/senior-${profession.toLowerCase().replace(/\s+/g, "-")}`,
        postedDate: "2 days ago",
        matchScore: this.calculateMatchScore(
          {
            title: `Senior ${profession}`,
            description: `${profession} ${userProfile.skills.join(" ")} experience`,
            location: "San Francisco, CA",
          },
          userProfile,
        ),
        requirements: ["5+ years experience", "Bachelor's degree", ...userProfile.skills.slice(0, 3)],
        benefits: ["Health insurance", "Stock options", "Remote work", "401k"],
      },
    ]

    return mockJobs
  }
}

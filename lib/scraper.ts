// Tavily API integration for job scraping
interface JobListing {
  title: string
  company: string
  location: string
  url: string
  description?: string
  salary?: string
  postedDate?: string
}

interface TavilySearchResult {
  title: string
  url: string
  content: string
  score: number
}

interface TavilyResponse {
  results: TavilySearchResult[]
}

export class JobScraper {
  private apiKey: string
  private baseUrl = "https://api.tavily.com/search"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Search for job postings using Tavily API
   * @param profession - Job title or profession to search for
   * @param location - Location to search in (optional)
   * @param keywords - Additional keywords to include in search
   * @returns Promise<JobListing[]>
   */
  async searchJobs(profession: string, location?: string, keywords?: string[]): Promise<JobListing[]> {
    try {
      // Construct search query
      let query = `${profession} jobs`
      if (location) {
        query += ` in ${location}`
      }
      if (keywords && keywords.length > 0) {
        query += ` ${keywords.join(" ")}`
      }

      // Add job board sites to search
      query += " site:linkedin.com OR site:indeed.com OR site:glassdoor.com OR site:monster.com"

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": this.apiKey,
        },
        body: JSON.stringify({
          query,
          search_depth: "advanced",
          include_answer: false,
          include_raw_content: false,
          max_results: 20,
          include_domains: ["linkedin.com", "indeed.com", "glassdoor.com", "monster.com", "ziprecruiter.com"],
        }),
      })

      if (!response.ok) {
        throw new Error(`Tavily API error: ${response.statusText}`)
      }

      const data: TavilyResponse = await response.json()

      // Parse and structure the job listings
      return this.parseJobListings(data.results)
    } catch (error) {
      console.error("Error scraping jobs:", error)
      // Return mock data for development/demo purposes
      return this.getMockJobs(profession, location)
    }
  }

  /**
   * Parse Tavily search results into structured job listings
   */
  private parseJobListings(results: TavilySearchResult[]): JobListing[] {
    return results
      .map((result, index) => {
        // Extract job information from title and content
        const title = this.extractJobTitle(result.title)
        const company = this.extractCompany(result.title, result.content)
        const location = this.extractLocation(result.content)
        const description = this.extractDescription(result.content)

        return {
          title,
          company,
          location,
          url: result.url,
          description,
        }
      })
      .filter((job) => job.title && job.company) // Filter out incomplete listings
  }

  /**
   * Extract job title from search result
   */
  private extractJobTitle(title: string): string {
    // Remove common job board suffixes and clean up title
    return title
      .replace(/\s*-\s*(LinkedIn|Indeed|Glassdoor|Monster).*$/i, "")
      .replace(/\s*\|\s*.*$/, "")
      .trim()
  }

  /**
   * Extract company name from title or content
   */
  private extractCompany(title: string, content: string): string {
    // Try to extract company from title first
    const titleMatch = title.match(/at\s+([^-|]+)/i)
    if (titleMatch) {
      return titleMatch[1].trim()
    }

    // Try to extract from content
    const contentMatch =
      content.match(/Company:\s*([^\n]+)/i) ||
      content.match(/Employer:\s*([^\n]+)/i) ||
      content.match(/at\s+([A-Z][a-zA-Z\s&]+)/i)

    if (contentMatch) {
      return contentMatch[1].trim()
    }

    return "Company Name"
  }

  /**
   * Extract location from content
   */
  private extractLocation(content: string): string {
    const locationMatch =
      content.match(/Location:\s*([^\n]+)/i) ||
      content.match(/([A-Z][a-z]+,\s*[A-Z]{2})/i) ||
      content.match(/(Remote|Hybrid)/i)

    return locationMatch ? locationMatch[1].trim() : "Location Not Specified"
  }

  /**
   * Extract job description from content
   */
  private extractDescription(content: string): string {
    // Get first 200 characters as description
    return content.substring(0, 200).trim() + "..."
  }

  /**
   * Get mock job data for development/demo purposes
   */
  private getMockJobs(profession: string, location?: string): JobListing[] {
    const mockJobs: JobListing[] = [
      {
        title: `Senior ${profession}`,
        company: "TechCorp Inc",
        location: location || "San Francisco, CA",
        url: "https://example.com/job1",
        description: `We are looking for an experienced ${profession} to join our growing team...`,
        salary: "$120,000 - $150,000",
        postedDate: "2 days ago",
      },
      {
        title: `${profession} - Remote`,
        company: "StartupXYZ",
        location: "Remote",
        url: "https://example.com/job2",
        description: `Join our remote-first team as a ${profession} and help build the future...`,
        salary: "$90,000 - $120,000",
        postedDate: "1 week ago",
      },
      {
        title: `Junior ${profession}`,
        company: "BigTech Solutions",
        location: location || "New York, NY",
        url: "https://example.com/job3",
        description: `Entry-level position for a motivated ${profession} looking to grow...`,
        salary: "$70,000 - $90,000",
        postedDate: "3 days ago",
      },
    ]

    return mockJobs
  }
}

/**
 * Utility function to create a job scraper instance
 * In production, you would get the API key from environment variables
 */
export function createJobScraper(): JobScraper {
  const apiKey = process.env.TAVILY_API_KEY || "demo-key"
  return new JobScraper(apiKey)
}

/**
 * Extract keywords from resume text for job matching
 */
export function extractResumeKeywords(resumeText: string): string[] {
  // Common tech skills and keywords to look for
  const techSkills = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "React",
    "Vue",
    "Angular",
    "Node.js",
    "Express",
    "Django",
    "Flask",
    "HTML",
    "CSS",
    "SASS",
    "SCSS",
    "Tailwind",
    "Bootstrap",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Firebase",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "GitLab",
    "CI/CD",
    "Jenkins",
    "REST API",
    "GraphQL",
    "Microservices",
    "Agile",
    "Scrum",
  ]

  const foundKeywords: string[] = []
  const resumeLower = resumeText.toLowerCase()

  techSkills.forEach((skill) => {
    if (resumeLower.includes(skill.toLowerCase())) {
      foundKeywords.push(skill)
    }
  })

  // Also extract years of experience
  const experienceMatch = resumeText.match(/(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/i)
  if (experienceMatch) {
    foundKeywords.push(`${experienceMatch[1]} years experience`)
  }

  return foundKeywords
}

interface Contact {
  name: string
  role: string
  email: string
  linkedinUrl?: string
  confidence: number
}

interface Company {
  name: string
  domain: string
  size: string
}

export class ContactFinder {
  /**
   * Find hiring managers and recruiters at a company
   * In production, this would integrate with LinkedIn API, Apollo.io, etc.
   */
  static async findContacts(company: string, jobTitle: string): Promise<Contact[]> {
    // Mock implementation - in production, integrate with:
    // - LinkedIn Sales Navigator API
    // - Apollo.io API
    // - Hunter.io API
    // - Clearbit API

    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    return this.getMockContacts(company, jobTitle)
  }

  /**
   * Mock contact data for demo purposes
   */
  private static getMockContacts(company: string, jobTitle: string): Contact[] {
    const mockContacts: Record<string, Contact[]> = {
      Google: [
        {
          name: "Sarah Chen",
          role: "Engineering Manager",
          email: "sarah.chen@google.com",
          linkedinUrl: "https://linkedin.com/in/sarahchen",
          confidence: 95,
        },
        {
          name: "Michael Rodriguez",
          role: "Senior Technical Recruiter",
          email: "m.rodriguez@google.com",
          linkedinUrl: "https://linkedin.com/in/mrodriguez",
          confidence: 88,
        },
      ],
      Stripe: [
        {
          name: "Emily Johnson",
          role: "Engineering Manager",
          email: "emily@stripe.com",
          linkedinUrl: "https://linkedin.com/in/emilyjohnson",
          confidence: 92,
        },
        {
          name: "David Kim",
          role: "Technical Recruiter",
          email: "david.kim@stripe.com",
          confidence: 85,
        },
      ],
      Vercel: [
        {
          name: "Lee Robinson",
          role: "VP of Developer Experience",
          email: "lee@vercel.com",
          linkedinUrl: "https://linkedin.com/in/leerob",
          confidence: 98,
        },
        {
          name: "Alex Thompson",
          role: "Engineering Manager",
          email: "alex@vercel.com",
          confidence: 90,
        },
      ],
    }

    return (
      mockContacts[company] || [
        {
          name: "John Smith",
          role: "Engineering Manager",
          email: `john.smith@${company.toLowerCase().replace(/\s+/g, "")}.com`,
          confidence: 75,
        },
      ]
    )
  }

  /**
   * Validate email addresses
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Get company domain from company name
   */
  static getCompanyDomain(companyName: string): string {
    const domainMap: Record<string, string> = {
      Google: "google.com",
      Microsoft: "microsoft.com",
      Apple: "apple.com",
      Amazon: "amazon.com",
      Meta: "meta.com",
      Netflix: "netflix.com",
      Stripe: "stripe.com",
      Vercel: "vercel.com",
      OpenAI: "openai.com",
      Anthropic: "anthropic.com",
    }

    return domainMap[companyName] || `${companyName.toLowerCase().replace(/\s+/g, "")}.com`
  }
}

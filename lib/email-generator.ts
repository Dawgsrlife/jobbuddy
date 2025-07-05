interface EmailGenerationParams {
  recipientName: string
  recipientRole: string
  company: string
  jobTitle: string
  jobDescription: string
  userProfile: {
    name: string
    skills: string[]
    experience: string
    resumeUrl?: string
  }
}

export class EmailGenerator {
  /**
   * Generate a personalized cold email for job outreach
   */
  static generateColdEmail(params: EmailGenerationParams): string {
    const { recipientName, recipientRole, company, jobTitle, jobDescription, userProfile } = params

    // Extract key requirements from job description
    const keySkills = this.extractKeySkills(jobDescription, userProfile.skills)

    const email = `Subject: ${jobTitle} opportunity at ${company}

Hi ${recipientName},

I hope this email finds you well. I came across the ${jobTitle} position at ${company} and was immediately drawn to the opportunity.

${this.generatePersonalizedOpening(company, jobTitle, jobDescription)}

With my background in ${userProfile.experience} and expertise in ${keySkills.slice(0, 3).join(", ")}, I believe I could contribute meaningfully to your team. ${this.generateValueProposition(keySkills, jobDescription)}

I'd love to learn more about the role and discuss how my experience aligns with ${company}'s goals. Would you be open to a brief conversation?

${userProfile.resumeUrl ? `I've attached my resume for your review: ${userProfile.resumeUrl}` : ""}

Thank you for your time and consideration.

Best regards,
${userProfile.name}

---
This email was sent on behalf of ${userProfile.name} by JobBuddy. If you'd prefer not to receive these emails, please reply with "unsubscribe".`

    return email
  }

  /**
   * Extract relevant skills from job description that match user's skills
   */
  private static extractKeySkills(jobDescription: string, userSkills: string[]): string[] {
    const jobDescLower = jobDescription.toLowerCase()
    return userSkills.filter((skill) => jobDescLower.includes(skill.toLowerCase()))
  }

  /**
   * Generate personalized opening based on company and role
   */
  private static generatePersonalizedOpening(company: string, jobTitle: string, jobDescription: string): string {
    const openings = [
      `I've been following ${company}'s work and am impressed by your commitment to innovation.`,
      `${company}'s reputation for technical excellence and collaborative culture really resonates with me.`,
      `I've been excited about ${company}'s recent developments and would love to contribute to your mission.`,
    ]

    return openings[Math.floor(Math.random() * openings.length)]
  }

  /**
   * Generate value proposition based on skills match
   */
  private static generateValueProposition(matchedSkills: string[], jobDescription: string): string {
    if (matchedSkills.length >= 3) {
      return "I'm particularly excited about this role because it aligns perfectly with my technical background."
    } else if (matchedSkills.length >= 1) {
      return "While I'm always eager to learn new technologies, my current skillset provides a strong foundation for this role."
    } else {
      return "I'm passionate about taking on new challenges and believe my problem-solving approach would be valuable to your team."
    }
  }

  /**
   * Generate follow-up email for non-responders
   */
  static generateFollowUpEmail(originalParams: EmailGenerationParams, daysSinceOriginal: number): string {
    const { recipientName, company, jobTitle, userProfile } = originalParams

    return `Subject: Following up on ${jobTitle} at ${company}

Hi ${recipientName},

I wanted to follow up on my email from ${daysSinceOriginal} days ago regarding the ${jobTitle} position at ${company}.

I understand you're likely busy, but I remain very interested in the opportunity and would appreciate any feedback you might have.

If the timing isn't right or if there are other roles that might be a better fit, I'd be happy to discuss those as well.

Thank you again for your time.

Best regards,
${userProfile.name}`
  }
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  leetcode: string;
}

export interface Metrics {
  github_stars: number;
  github_repos: number;
  leetcode_solved: number;
  leetcode_hard: number;
  leetcode_medium: number;
}

export interface Project {
  title: string;
  description: string;
  tech_stack: string[];
  url?: string;
  category?: "ai-ml" | "web" | "systems" | "security"; // UI compat
}

export interface Experience {
  company: string;
  title: string;
  duration: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year?: string;
  badge?: "elite" | "verified" | "professional";
}

export interface ProfileInfo {
  name: string;
  cgpa: number | null;
  headline: string;
  summary: string;
}

export interface MasterProfile {
  name: string;
  cgpa: number | null;
  headline: string;
  summary: string;
  contact: Contact;
  metrics: Metrics;
  skills: string[];
  projects: Project[];
  top_projects: string[];
  experience: Experience[];
  education: Education[];
  certifications?: Certification[];
  achievements?: string[];
}

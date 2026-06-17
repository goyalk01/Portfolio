import type { MasterProfile } from "../types/profile";
import profileData from "../data/master_profile.json";
import { BrainCircuit, Cloud, Code2, Brain, Layers, Zap } from "lucide-react";

// Cast the imported JSON to our MasterProfile type
export const profile = profileData as MasterProfile;

// Types needed by UI that aren't perfectly aligned with MasterProfile yet
export interface TimelineEntry {
  phase: string;
  title: string;
  description: string;
}

export interface Achievement {
  metric: string;
  label: string;
  description: string;
}

export interface UIProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  wikiSlug: string;
  category: string;
}

// Typed Helpers & Adapters
export const projects: UIProject[] = profile.projects.map(p => ({
  id: p.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
  title: p.title,
  description: p.description,
  tags: p.tech_stack,
  category: p.category || "ai-ml",
  githubUrl: p.url,
}));

export const projectCategories = [
  { key: "all", label: "All" },
  { key: "ai-ml", label: "AI / ML" },
  { key: "security", label: "Cybersecurity" },
  { key: "web", label: "Web & Analytics" },
  { key: "systems", label: "Systems" },
] as const;

export const topProjects = projects.filter(p => profile.top_projects.includes(p.title));

export const skillCategories = [
  { key: "all", label: "All" },
  { key: "language", label: "Languages" },
  { key: "ai-ml", label: "AI / ML" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "cloud", label: "Cloud & DevOps" },
  { key: "tools", label: "Tools" },
] as const;

const skillCategoryMap: Record<string, string> = {
  "Python": "language", "Java": "language", "C++": "language", "C": "language", "JavaScript": "language", "TypeScript": "language", "HTML / CSS": "language",
  "OpenCV": "ai-ml", "RAG": "ai-ml", "Vertex AI": "ai-ml", "Gemini API": "ai-ml", "Machine Learning": "ai-ml", "Deep Learning": "ai-ml", "LSTM": "ai-ml", "Computer Vision": "ai-ml", "dlib": "ai-ml",
  "React": "frontend", "HTML": "frontend", "CSS": "frontend", "Tailwind CSS": "frontend",
  "FastAPI": "backend", "REST APIs": "backend",
  "Google Cloud": "cloud", "Cloud Run": "cloud", "Firestore": "cloud", "Oracle Cloud": "cloud", "Docker": "cloud",
  "Git & GitHub": "tools", "VS Code": "tools", "Linux": "tools", "DSA": "tools"
};

export const skills: Skill[] = profile.skills.map(s => ({
  name: s,
  wikiSlug: s.replace(/ /g, "_"),
  category: skillCategoryMap[s] || "tools"
}));

export const contactInfo = profile.contact;
export const metrics = profile.metrics;
export const experience = profile.experience;
export const education = profile.education;
export const certifications = profile.certifications || [];

// Map raw achievements to UI format
const rawAchievements = profile.achievements || [];
export const achievements: Achievement[] = [
  {
    metric: "8.82",
    label: "CGPA",
    description: rawAchievements[0]?.split(" — ")[1] || "B.Tech Computer Science & Engineering at VIT Bhopal University",
  },
  {
    metric: "Top 3%",
    label: "GSSoC '26",
    description: "Ranked 1283 out of 43,539 in GirlScript Summer of Code",
  },
  {
    metric: "Top 45",
    label: "Smart India Hackathon",
    description: "Led a team of 6 among 900+ competing teams nationally",
  },
  {
    metric: "3+",
    label: "Hackathon Finals",
    description: "Advanced in major competitions including Rosetta Code & SoIVIT",
  },
];

// Adapters for existing UI components
export const timelineEntries: TimelineEntry[] = [
  ...profile.education.map(e => ({
    phase: e.duration,
    title: `${e.degree} @ ${e.school}`,
    description: ""
  })),
  ...profile.experience.map(e => ({
    phase: e.duration,
    title: `${e.title} @ ${e.company}`,
    description: e.description
  }))
];

export const focusAreas = [
  {
    icon: BrainCircuit,
    title: "AI & Machine Learning",
    description: "Developing intelligent systems including Multi-Agent architectures, RAG pipelines, and Computer Vision models using TensorFlow and Google Cloud Vertex AI.",
  },
  {
    icon: Code2,
    title: "Software Engineering",
    description: "Building scalable full-stack applications and robust backends with FastAPI, React, and TypeScript, focusing on practical and self-healing solutions.",
  },
  {
    icon: Cloud,
    title: "Cloud & Cybersecurity",
    description: "Deploying applications on Google Cloud and Oracle Cloud, and developing security tools like IoT Intrusion Detection and Threat Monitoring Dashboards.",
  },
];

export const philosophyItems = [
  {
    icon: Brain,
    title: "Learn by Building",
    description: "I believe the fastest path to mastery is hands-on implementation. Every project I build, from multi-agent systems to threat dashboards, solidifies my understanding.",
  },
  {
    icon: Layers,
    title: "Explore Before Specializing",
    description: "I actively explore multiple domains—AI, cloud, full-stack, and systems—to build a versatile foundation before diving deep into a single narrow specialization.",
  },
  {
    icon: Zap,
    title: "Practical Impact",
    description: "Technology should solve real problems. I focus on building systems that offer practical automation, security, and intelligence, aiming for real-world impact.",
  },
];

export const faqItems = [
  {
    question: "What are you most passionate about in technology?",
    answer: "I'm passionate about building intelligent systems and practical software solutions. I enjoy exploring multiple domains, including Artificial Intelligence, Machine Learning, Cloud Computing, Cybersecurity, and Full-Stack Development. Building systems that can reason, automate, and solve real-world problems excites me.",
  },
  {
    question: "Are you open to internships or collaborations?",
    answer: "Absolutely. I'm actively seeking internship opportunities and collaborations across AI, Software Engineering, Cloud, Systems, and Research domains. Having completed virtual internships with Google Cloud and ServiceNow, and ranking in the Top 3% of GSSoC '26, I bring hands-on experience and a strong drive to contribute meaningfully.",
  },
  {
    question: "What are you currently learning?",
    answer: "I'm advancing my skills in Multi-Agent AI Systems, Retrieval-Augmented Generation, and Computer Vision. I'm also deepening my cloud expertise and exploring real-time decision systems and cybersecurity tools like Intrusion Detection Systems.",
  },
  {
    question: "What sets you apart from other students?",
    answer: "I believe in learning by building. I've developed complex projects like a self-healing multi-agent workflow engine (CASCADE) and an IoT intrusion detection system. I hold elite certifications, placed in the Top 45 at Smart India Hackathon, and ranked 1283 out of 43,539 in GSSoC '26.",
  },
  {
    question: "What tech stack do you prefer?",
    answer: "I choose the right tool for the job. For AI/ML, I use Python, TensorFlow, OpenCV, Vertex AI, and Gemini. For backend and APIs, I work with FastAPI. For frontend, I use React, TypeScript, and Tailwind CSS. For cloud and deployment, I use Google Cloud Run, Firestore, Docker, and Oracle Cloud.",
  },
];

import { UserProfile, Listing, Post } from "./app"

export const defaultUser: UserProfile = {
  name: "Mitanshu Bhasin",
  username: "mitanshu",
  bio: "Founder & CEO at Explyra — Building the future of SaaS, AI, and digital infrastructure. Full-stack developer, product thinker, and startup enthusiast.",
  imageUrl: "",
  skills: ["React", "Next.js", "TypeScript", "Node.js", "Firebase", "Product Design", "AI/ML", "Startup Strategy"],
  experience: { years: "4+", description: "Led development of multiple SaaS platforms including Explyra's suite of tools spanning expense management, CRM, health tracking, and professional marketplaces. Expertise in architecting scalable web applications and leading cross-functional teams." },
  education: [
    { id: "1", institution: "University of Delhi", degree: "B.Tech", field: "Computer Science & Engineering", year: "2024" }
  ],
  email: "mitanshub@explyra.me",
  website: "https://explyra.me",
  displaySettings: {
    showSkills: true,
    showExperience: true,
    showEducation: true,
    showEmail: true,
  },
  following: [],
  followers: [],
}

export function loadUser(): UserProfile {
  if (typeof window === "undefined") return defaultUser
  try {
    const saved = localStorage.getItem("explyra_skill_user")
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.name) return { ...defaultUser, ...parsed }
    }
  } catch { /* ignore parse errors */ }
  return defaultUser
}

export const initialListings: Listing[] = [
  {
    id: "1",
    title: "Premium Next.js SaaS Boilerplate",
    description: "A complete, production-ready SaaS template with authentication, database integration, and Stripe payments. Perfect for launching your next big idea.",
    price: "$49",
    type: "product",
    category: "SaaS Template",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    createdAt: "2024-03-15T10:00:00.000Z",
    owner: "mitanshu",
    requested: false
  },
  {
    id: "2",
    title: "UI/UX Design Review",
    description: "Professional audit of your application's user interface and experience. Get actionable feedback on how to improve conversion and usability.",
    price: "$120/hour",
    type: "service",
    category: "UI/UX Design",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop",
    createdAt: "2024-03-14T10:00:00.000Z",
    owner: "arivera",
    requested: false
  },
  {
    id: "3",
    title: "Custom AI Agent Integration",
    description: "Expert integration of LLMs (GPT-4, Claude) into your existing workflows. Build intelligent automation for customer support or data analysis.",
    price: "Custom",
    type: "service",
    category: "AI & ML",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    createdAt: "2024-03-15T09:00:00.000Z",
    owner: "schen_design",
    requested: false
  },
  {
    id: "4",
    title: "Minimalist Icon Pack (200+ Icons)",
    description: "High-quality SVG icons for modern web apps. Hand-crafted, pixel-perfect, and fully customizable for your brand.",
    price: "Free",
    type: "product",
    category: "Graphic Design",
    thumbnail: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=800&auto=format&fit=crop",
    createdAt: "2024-03-13T10:00:00.000Z",
    owner: "mitanshu",
    requested: false
  }
]

export const initialPosts: Post[] = [
  {
    id: "1",
    author: "Alex Rivera",
    authorUsername: "arivera",
    authorImage: "https://i.pravatar.cc/150?u=arivera",
    content: "Just finished a new Next.js template for the marketplace! Check it out if you need a head start on your SaaS. 🚀",
    timestamp: "2h ago",
    likes: 24,
    comments: 5,
  },
  {
    id: "2",
    author: "Sarah Chen",
    authorUsername: "schen_design",
    authorImage: "https://i.pravatar.cc/150?u=sarah",
    content: "Looking for a backend developer for a short-term fintech project. Must be familiar with Node.js and PostgreSQL. DM me! 💼",
    timestamp: "5h ago",
    likes: 12,
    comments: 8,
  }
]

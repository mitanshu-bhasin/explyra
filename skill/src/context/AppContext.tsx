import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Listing {
  id: string
  title: string
  description: string
  price: string
  type: "product" | "service"
  category: string
  thumbnail: string
  createdAt: string
  owner: string
  requested: boolean
}

export interface Post {
  id: string
  author: string
  authorUsername: string
  authorImage: string
  content: string
  timestamp: string
  likes: number
  comments: number
  isLiked?: boolean
}

export interface UserProfile {
  name: string
  username: string
  bio: string
  imageUrl: string
  skills: string[]
  experience: { years: string; description: string }
  education: { id: string; institution: string; degree: string; field: string; year: string }[]
  email: string
  website: string
  displaySettings: {
    showSkills: boolean
    showExperience: boolean
    showEducation: boolean
    showEmail: boolean
  }
  following: string[]
  followers: string[]
}

interface AppState {
  user: UserProfile
  setUser: (u: UserProfile) => void
  listings: Listing[]
  posts: Post[]
  addListing: (l: Omit<Listing, "id" | "createdAt" | "owner" | "requested">) => void
  removeListing: (id: string) => void
  toggleRequest: (id: string) => void
  addPost: (content: string) => void
  deletePost: (id: string) => void
  toggleLikePost: (id: string) => void
  followUser: (username: string) => void
  unfollowUser: (username: string) => void
  deleteAccount: () => void
}

const defaultUser: UserProfile = {
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

// Read from localStorage if available
function loadUser(): UserProfile {
  try {
    const saved = localStorage.getItem("explyra_skill_user")
    if (saved) {
      const parsed = JSON.parse(saved)
      // Only use saved data if it has a name (i.e. profile was set up)
      if (parsed.name) return { ...defaultUser, ...parsed }
    }
  } catch { /* ignore parse errors */ }
  return defaultUser
}


const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserProfile>(loadUser)

  const setUser = (u: UserProfile) => {
    setUserState(u)
    localStorage.setItem("explyra_skill_user", JSON.stringify(u))
  }

  // Persist on every user change
  useEffect(() => {
    localStorage.setItem("explyra_skill_user", JSON.stringify(user))
  }, [user])
  const [listings, setListings] = useState<Listing[]>([
    {
      id: "1",
      title: "Premium Next.js SaaS Boilerplate",
      description: "A complete, production-ready SaaS template with authentication, database integration, and Stripe payments. Perfect for launching your next big idea.",
      price: "$49",
      type: "product",
      category: "SaaS Template",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      createdAt: new Date().toISOString(),
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
      createdAt: new Date(Date.now() - 86400000).toISOString(),
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
      createdAt: new Date(Date.now() - 3600000).toISOString(),
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
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      owner: "mitanshu",
      requested: false
    }
  ])
  const [posts, setPosts] = useState<Post[]>([
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
  ])

  const addListing = (l: Omit<Listing, "id" | "createdAt" | "owner" | "requested">) => {
    const newListing: Listing = {
      ...l,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      owner: user.username || user.name || "You",
      requested: false,
    }
    setListings((prev: Listing[]) => [newListing, ...prev])
  }

  const removeListing = (id: string) => {
    setListings((prev: Listing[]) => prev.filter((l: Listing) => l.id !== id))
  }

  const toggleRequest = (id: string) => {
    setListings((prev: Listing[]) =>
      prev.map((l: Listing) => (l.id === id ? { ...l, requested: !l.requested } : l))
    )
  }

  const addPost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: user.name || "User",
      authorUsername: user.username || "user",
      authorImage: user.imageUrl || "https://i.pravatar.cc/150?u=user",
      content,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
    }
    setPosts((prev: Post[]) => [newPost, ...prev])
  }

  const deletePost = (id: string) => {
    setPosts((prev: Post[]) => prev.filter((p: Post) => p.id !== id))
  }

  const toggleLikePost = (id: string) => {
    setPosts((prev: Post[]) => prev.map((p: Post) => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked
        }
      }
      return p
    }))
  }

  const followUser = (username: string) => {
    setUser({
      ...user,
      following: [...(user.following || []), username]
    })
  }

  const unfollowUser = (username: string) => {
    setUser({
      ...user,
      following: (user.following || []).filter((u: string) => u !== username)
    })
  }

  const deleteAccount = () => {
    const emptyUser: UserProfile = { ...defaultUser, name: "", username: "", bio: "", skills: [], experience: { years: "", description: "" }, education: [], email: "", website: "" }
    setUser(emptyUser)
    setListings([])
    setPosts([])
    localStorage.removeItem("explyra_skill_user")
  }

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      listings, 
      posts,
      addListing, 
      removeListing, 
      toggleRequest,
      addPost,
      deletePost,
      toggleLikePost,
      followUser,
      unfollowUser,
      deleteAccount
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}

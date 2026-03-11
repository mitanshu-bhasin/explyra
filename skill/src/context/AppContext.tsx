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
  const [listings, setListings] = useState<Listing[]>([])
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
    setListings((prev) => [newListing, ...prev])
  }

  const removeListing = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id))
  }

  const toggleRequest = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, requested: !l.requested } : l))
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
    setPosts(prev => [newPost, ...prev])
  }

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  const toggleLikePost = (id: string) => {
    setPosts(prev => prev.map(p => {
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

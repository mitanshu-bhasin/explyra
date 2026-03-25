import { useState, useEffect, type ReactNode } from "react"
import { Listing, Post, UserProfile } from "../types/app"
import { defaultUser, initialListings, initialPosts, loadUser } from "../types/data"
import { AppContext } from "./AppContextContext"

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserProfile>(loadUser)
  const [listings, setListings] = useState<Listing[]>(initialListings)
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const setUser = (u: UserProfile) => {
    setUserState(u)
    localStorage.setItem("explyra_skill_user", JSON.stringify(u))
  }

  // Persist on every user change
  useEffect(() => {
    localStorage.setItem("explyra_skill_user", JSON.stringify(user))
  }, [user])

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

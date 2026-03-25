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

export interface AppState {
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

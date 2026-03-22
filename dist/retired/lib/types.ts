export type UserRole = "expert" | "client" | "admin";

export interface RetiredUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: Date | string;
}

export interface Expert {
  id: string;
  uid: string;
  fullName: string;
  age: number;
  pastProfession: string;
  yearsOfExperience: number;
  industry: string;
  skills: string[];
  bio: string;
  languages: string[];
  consultationPrice: number; // per hour in USD
  availability: string; // e.g. "Weekdays 9am-5pm"
  linkedinUrl?: string;
  profileImageUrl: string;
  documentUrls?: string[];
  isApproved: boolean;
  isVisible: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Client {
  id: string;
  uid: string;
  fullName: string;
  organization?: string;
  clientType: "startup" | "sme" | "student" | "ngo" | "company" | "individual";
  email: string;
  profileImageUrl?: string;
  createdAt: Date | string;
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  expertId: string;
  expertName: string;
  dateTime: string; // ISO string
  duration: 30 | 60; // minutes
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date | string;
}

export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  clientName: string;
  expertId: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO string
  createdAt: Date | string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorImageUrl?: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  category: "career-advice" | "industry-insights" | "mentoring" | "general";
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Chat {
  id: string;
  participants: string[]; // [clientId, expertId]
  clientId: string;
  expertId: string;
  lastMessage?: string;
  lastMessageAt?: Date | string;
  createdAt: Date | string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: Date | string;
}

export interface SearchFilters {
  industry?: string;
  skill?: string;
  minExperience?: number;
  maxPrice?: number;
  language?: string;
  availability?: string;
  query?: string;
}

export const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Legal",
  "Marketing",
  "Engineering",
  "Consulting",
  "Real Estate",
  "HR & Recruitment",
  "Supply Chain",
  "Government",
  "Non-Profit",
  "Media & Publishing",
  "Other",
];

export const CLIENT_TYPES = [
  { value: "startup", label: "Startup" },
  { value: "sme", label: "SME" },
  { value: "student", label: "Student" },
  { value: "ngo", label: "NGO" },
  { value: "company", label: "Company" },
  { value: "individual", label: "Individual" },
];

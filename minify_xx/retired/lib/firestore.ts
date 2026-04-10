import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Expert, Booking, Review, Post, Chat, Message, RetiredUser } from "./types";

// ─── Collections ─────────────────────────────────────────────────────────────
const USERS = "retired_users";
const EXPERTS = "retired_experts";
const BOOKINGS = "retired_bookings";
const REVIEWS = "retired_reviews";
const POSTS = "retired_posts";
const CHATS = "retired_chats";

// ─── Users ───────────────────────────────────────────────────────────────────
export async function createRetiredUser(uid: string, data: Partial<RetiredUser>) {
  await setDoc(doc(db, USERS, uid), { ...data, createdAt: serverTimestamp() });
}

export async function getRetiredUser(uid: string): Promise<RetiredUser | null> {
  const snap = await getDoc(doc(db, USERS, uid));
  if (!snap.exists()) return null;
  return { uid: snap.id, ...snap.data() } as RetiredUser;
}

export async function updateRetiredUser(uid: string, data: Partial<RetiredUser>) {
  await updateDoc(doc(db, USERS, uid), { ...data, updatedAt: serverTimestamp() });
}

// ─── Experts ─────────────────────────────────────────────────────────────────
export async function createExpert(uid: string, data: Partial<Expert>) {
  await setDoc(doc(db, EXPERTS, uid), {
    ...data,
    uid,
    isApproved: false,
    isVisible: true,
    isFeatured: false,
    rating: 0,
    reviewCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getExpert(id: string): Promise<Expert | null> {
  const snap = await getDoc(doc(db, EXPERTS, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Expert;
}

export async function updateExpert(id: string, data: Partial<Expert>) {
  await updateDoc(doc(db, EXPERTS, id), { ...data, updatedAt: serverTimestamp() });
}

export async function getApprovedExperts(limitCount = 20): Promise<Expert[]> {
  // Simple where-only query to avoid needing composite index
  const q = query(
    collection(db, EXPERTS),
    where("isApproved", "==", true),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  const experts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Expert));
  // Client-side filter for visibility: include if true or undefined
  const visibleExperts = experts.filter(e => e.isVisible !== false);
  // Sort client-side by rating
  return visibleExperts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
}

export async function getFeaturedExperts(): Promise<Expert[]> {
  // Use single equality filter to avoid composite index
  const q = query(
    collection(db, EXPERTS),
    where("isFeatured", "==", true),
    limit(10)
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as Expert))
    .filter((e) => e.isApproved && e.isVisible !== false);
}

export async function searchExperts(filters: {
  industry?: string;
  skill?: string;
  language?: string;
}) : Promise<Expert[]> {
  // Always start with just the approved filter
  const q = query(collection(db, EXPERTS), where("isApproved", "==", true));
  const snap = await getDocs(q);
  let results = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Expert));

  // Client-side visibility filter: show if true or undefined (default)
  results = results.filter(e => e.isVisible !== false);

  // All further filtering is done client-side to avoid composite index issues
  if (filters.industry) {
    results = results.filter((e) => e.industry === filters.industry);
  }
  if (filters.language) {
    results = results.filter((e) =>
      e.languages?.some((l) => l.toLowerCase().includes(filters.language!.toLowerCase()))
    );
  }
  if (filters.skill) {
    results = results.filter((e) =>
      e.skills?.some((s) => s.toLowerCase().includes(filters.skill!.toLowerCase()))
    );
  }
  return results;
}

export async function getAllExperts(): Promise<Expert[]> {
  const snap = await getDocs(collection(db, EXPERTS));
  const experts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Expert));
  return experts.sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt as string).getTime() : 0;
    const db2 = b.createdAt ? new Date(b.createdAt as string).getTime() : 0;
    return db2 - da;
  });
}

export async function getPendingExperts(): Promise<Expert[]> {
  const q = query(collection(db, EXPERTS), where("isApproved", "==", false));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Expert));
}

export async function approveExpert(id: string, approved: boolean = true) {
  await updateDoc(doc(db, EXPERTS, id), { isApproved: approved, updatedAt: serverTimestamp() });
}

export async function featureExpert(id: string, featured: boolean) {
  await updateDoc(doc(db, EXPERTS, id), { isFeatured: featured, updatedAt: serverTimestamp() });
}

export async function deleteExpert(id: string) {
  await deleteDoc(doc(db, EXPERTS, id));
}

// ─── Bookings ─────────────────────────────────────────────────────────────────
export async function createBooking(data: Partial<Booking>) {
  const ref = await addDoc(collection(db, BOOKINGS), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getBookingsByClient(clientId: string): Promise<Booking[]> {
  // Simple where-only query, sort client-side
  const q = query(collection(db, BOOKINGS), where("clientId", "==", clientId));
  const snap = await getDocs(q);
  const bookings = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Booking));
  return bookings.sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt as string).getTime() : 0;
    const db2 = b.createdAt ? new Date(b.createdAt as string).getTime() : 0;
    return db2 - da;
  });
}

export async function getBookingsByExpert(expertId: string): Promise<Booking[]> {
  const q = query(collection(db, BOOKINGS), where("expertId", "==", expertId));
  const snap = await getDocs(q);
  const bookings = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Booking));
  return bookings.sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt as string).getTime() : 0;
    const db2 = b.createdAt ? new Date(b.createdAt as string).getTime() : 0;
    return db2 - da;
  });
}

export async function updateBookingStatus(id: string, status: Booking["status"]) {
  await updateDoc(doc(db, BOOKINGS, id), { status });
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
export async function createReview(data: Partial<Review>) {
  const ref = await addDoc(collection(db, REVIEWS), {
    ...data,
    date: new Date().toISOString(),
    createdAt: serverTimestamp(),
  });
  // Update expert rating
  const reviews = await getReviewsByExpert(data.expertId!);
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  await updateDoc(doc(db, EXPERTS, data.expertId!), {
    rating: Math.round(avg * 10) / 10,
    reviewCount: reviews.length,
  });
  return ref.id;
}

export async function getReviewsByExpert(expertId: string): Promise<Review[]> {
  // Simple where-only query, sort client-side
  const q = query(collection(db, REVIEWS), where("expertId", "==", expertId));
  const snap = await getDocs(q);
  const reviews = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
  return reviews.sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt as string).getTime() : 0;
    const db2 = b.createdAt ? new Date(b.createdAt as string).getTime() : 0;
    return db2 - da;
  });
}

// ─── Posts ───────────────────────────────────────────────────────────────────
export async function createPost(data: Partial<Post>) {
  const ref = await addDoc(collection(db, POSTS), {
    ...data,
    published: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getPosts(limitCount = 20): Promise<Post[]> {
  // Simple where-only query, sort client-side
  const q = query(collection(db, POSTS), where("published", "==", true), limit(limitCount));
  const snap = await getDocs(q);
  const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Post));
  return posts.sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt as string).getTime() : 0;
    const db2 = b.createdAt ? new Date(b.createdAt as string).getTime() : 0;
    return db2 - da;
  });
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  const q = query(collection(db, POSTS), where("authorId", "==", authorId));
  const snap = await getDocs(q);
  const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Post));
  return posts.sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt as string).getTime() : 0;
    const db2 = b.createdAt ? new Date(b.createdAt as string).getTime() : 0;
    return db2 - da;
  });
}

// ─── Chats & Messages ─────────────────────────────────────────────────────────
export async function getOrCreateChat(clientId: string, expertId: string): Promise<string> {
  const q = query(
    collection(db, CHATS),
    where("clientId", "==", clientId),
    where("expertId", "==", expertId)
  );
  const snap = await getDocs(q);
  if (!snap.empty) return snap.docs[0].id;
  const ref = await addDoc(collection(db, CHATS), {
    participants: [clientId, expertId],
    clientId,
    expertId,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function sendMessage(chatId: string, data: Partial<Message>) {
  const ref = await addDoc(collection(db, CHATS, chatId, "messages"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, CHATS, chatId), {
    lastMessage: data.content,
    lastMessageAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getChatsForUser(uid: string): Promise<Chat[]> {
  // Simple where-only query, sort client-side
  const q = query(collection(db, CHATS), where("participants", "array-contains", uid));
  const snap = await getDocs(q);
  const chats = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Chat));
  return chats.sort((a, b) => {
    const da = a.lastMessageAt ? new Date(a.lastMessageAt as string).getTime() : 0;
    const db2 = b.lastMessageAt ? new Date(b.lastMessageAt as string).getTime() : 0;
    return db2 - da;
  });
}

export async function getMessages(chatId: string): Promise<Message[]> {
  const q = query(collection(db, CHATS, chatId, "messages"));
  const snap = await getDocs(q);
  const messages = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message));
  // Sort client-side
  return messages.sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt as string).getTime() : 0;
    const db2 = b.createdAt ? new Date(b.createdAt as string).getTime() : 0;
    return da - db2;
  });
}

import { Metadata } from 'next';
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import BookingClient from "@/components/BookingClient";

interface Props {
  params: Promise<{ username: string }>;
}

interface UserProfile {
  id: string;
  displayName: string;
  username: string;
  meetingDuration: number;
  availableSlots: {
    days: string[];
    start: string;
    end: string;
  };
}

async function getProfile(username: string): Promise<UserProfile | null> {
  const cleanUsername = username.toLowerCase();
  console.log("Searching for profile with username:", cleanUsername);
  
  const q = query(collection(db, "users"), where("username", "==", cleanUsername));
  const snap = await getDocs(q);
  
  if (snap.empty) {
      console.log("No profile found for:", cleanUsername);
      return null;
  }
  
  const userDoc = snap.docs[0];
  console.log("Profile found:", userDoc.id);
  return { id: userDoc.id, ...userDoc.data() } as UserProfile;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    return {
      title: 'User Not Found | Explyra Booking',
    };
  }

  const title = `Book a session with ${profile.displayName} | Explyra Booking`;
  const description = `Schedule your ${profile.meetingDuration} minute meeting with ${profile.displayName} instantly on Explyra Booking. Professional scheduling for the Explyra Suite.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/booking_hero.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/booking_hero.png'],
    },
  };
}

export default async function Page({ params }: Props) {
  const { username } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    return (
        <div className="min-h-screen bg-[#080B14] flex flex-col items-center justify-center p-6 text-center text-white">
            <h1 className="text-3xl font-serif font-bold mb-4">User Not Found</h1>
            <p className="opacity-50 mb-8">This booking page does not exist or has been moved.</p>
        </div>
    );
  }

  return <BookingClient profile={profile} username={username} />;
}

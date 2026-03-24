"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const ADMIN_EMAIL = "explyras@gmail.com";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const useRouter_ = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === ADMIN_EMAIL) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        if (!loading) {
          useRouter_.push("/");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [useRouter_, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    );
  }

  if (!authorized) {
    return null; // or a custom 403 page
  }

  return <>{children}</>;
}

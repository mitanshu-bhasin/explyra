"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createRetiredUser, getRetiredUser } from "@/lib/firestore";
import type { RetiredUser, UserRole } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  retiredUser: RetiredUser | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signInWithGoogle: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [retiredUser, setRetiredUser] = useState<RetiredUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        let ru = await getRetiredUser(firebaseUser.uid);
        // Auto-create retiredUser doc if missing (e.g. admin account from parent project)
        if (!ru) {
          await createRetiredUser(firebaseUser.uid, {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || "User",
            role: firebaseUser.email === "explras@gmail.com" ? "admin" : "client",
          });
          ru = await getRetiredUser(firebaseUser.uid);
        }
        setRetiredUser(ru);
      } else {
        setRetiredUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    await createRetiredUser(cred.user.uid, {
      uid: cred.user.uid,
      email,
      displayName: name,
      role,
    });
  };

  const signInWithGoogle = async (role: UserRole) => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    // Check if user already exists
    const existing = await getRetiredUser(cred.user.uid);
    if (!existing) {
      await createRetiredUser(cred.user.uid, {
        uid: cred.user.uid,
        email: cred.user.email!,
        displayName: cred.user.displayName!,
        role,
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        retiredUser,
        role: retiredUser?.role ?? null,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

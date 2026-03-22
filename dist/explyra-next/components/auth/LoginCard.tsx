"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Zap, Eye, EyeOff, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function LoginCard() {
  const { signInEmail, signInGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInEmail(email, password);
      router.push("/admin");
    } catch {
      setError("Invalid credentials. Please check your email or password.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    try {
      await signInGoogle();
      router.push("/admin");
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card w-full max-w-sm p-8 shadow-2xl"
    >
      {/* Logo */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <Zap className="text-white dark:text-black w-6 h-6" />
        </motion.div>
        <h1 className="text-2xl font-bold tracking-tight mb-1.5">
          Explyra <span className="text-indigo-600">Core</span>
        </h1>
        <p className="text-sm text-slate-500">Platform Management &amp; Governance</p>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-medium"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
            Corporate Email
          </label>
          <input
            type="email"
            className="input-primary"
            placeholder="admin@explyra.me"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
            Secure Password
          </label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              className="input-primary pr-10"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-black dark:bg-white text-white dark:text-black font-bold h-11 rounded-xl hover:opacity-90 transition-all mt-4 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin" />
              Authenticating...
            </>
          ) : (
            "Continue"
          )}
        </motion.button>
      </form>

      {/* Divider */}
      <div className="mt-8 space-y-4">
        <div className="relative flex items-center py-2">
          <div className="grow border-t border-slate-200 dark:border-slate-800" />
          <span className="shrink mx-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Secondary Auth
          </span>
          <div className="grow border-t border-slate-200 dark:border-slate-800" />
        </div>

        <motion.button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold transition flex items-center justify-center gap-3 shadow-sm text-sm disabled:opacity-60"
        >
          {googleLoading ? (
            <span className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          ) : (
            <Image
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              width={16}
              height={16}
              unoptimized
            />
          )}
          Sign in with Google
        </motion.button>
      </div>

      {/* Back link */}
      <div className="mt-8 text-center">
        <a
          href="/"
          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
        >
          ← Public Portal
        </a>
      </div>
    </motion.div>
  );
}

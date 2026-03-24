"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Booking3D from "@/components/Booking3D";
import { 
  Calendar, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Moon, 
  Sun,
  Globe,
  Cpu
} from "lucide-react";
import Image from "next/image";

// SEO Metadata (Client-side metadata is handled via Head component or Next.js metadata API in server components, 
// since this is a client component for the theme toggle, we'll use a wrapper or just metadata export if possible. 
// However, since it's "use client", we'll use Head as fallback for now or assume parent layout handles it.
// Actually, Next.js 13+ metadata doesn't work in Client Components. 
// I'll provide the metadata in a separate file if needed, but for now I'll use a wrapper approach.)

export default function BookingLandingPage() {
  const { user, loading } = useAuth();
  const [isDark, setIsDark] = useState(false);

  // Sync with system preference on mount if needed, or just default to light as requested
  useEffect(() => {
    // Default is light as requested ("light themed rkh")
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-[#080B14] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark ? 'dark bg-[#080B14] text-white' : 'bg-brand-bg text-brand-ink'}`}>
      <Booking3D isDark={isDark} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center shadow-lg shadow-brand-blue/20">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight block leading-tight font-serif uppercase">Explyra Booking</span>
              <span className="text-[10px] font-bold opacity-60 tracking-[0.2em] uppercase">Part of Explyra Suite</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:scale-110 transition-transform"
            >
              {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-brand-blue" />}
            </button>
            <Link 
              href="/auth" 
              className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/10"
            >
              {user ? 'Go to App' : 'Get Started'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-brand-blue/10">
              <Zap size={14} /> Agentic Scheduling Engine
            </div>
            
            <h1 className="text-6xl md:text-7xl font-serif font-bold leading-[1.1] mb-8 lg:max-w-lg">
              Precision <span className="text-brand-blue dark:text-blue-400">Booking</span> for the Edge.
            </h1>
            
            <p className="text-lg opacity-60 mb-12 max-w-md leading-relaxed font-medium">
              Unified scheduling for teams and enterprises. Experience zero-latency booking with deep Explyra integration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/auth" 
                className="group px-8 py-4 rounded-2xl bg-brand-blue text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:gap-5 transition-all shadow-xl shadow-brand-blue/20"
              >
                Launch Booking <ArrowRight size={18} />
              </Link>
              <Link 
                href="/shop" 
                className="px-8 py-4 rounded-2xl bg-white dark:bg-white/5 border border-brand-bdr dark:border-white/10 font-bold text-sm uppercase tracking-widest flex items-center justify-center hover:bg-black/5 transition-all backdrop-blur-sm"
              >
                Browse Shop
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50 dark:border-white/10 transform hover:rotate-2 transition-transform duration-700">
              <Image 
                src="/booking_hero.png" 
                alt="Explyra Booking Interface" 
                width={800} 
                height={600}
                className="w-full h-auto scale-105 hover:scale-110 transition-transform duration-1000"
              />
            </div>
            {/* Decors */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/20 blur-3xl rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-teal/10 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="text-brand-blue" />}
              title="Enterprise Security"
              desc="Bank-grade encryption for all client meetings and scheduling data."
            />
            <FeatureCard 
              icon={<Globe className="text-brand-blue" />}
              title="Global Scale"
              desc="Deploy custom booking instances worldwide with edge-fast performance."
            />
            <FeatureCard 
              icon={<Cpu className="text-brand-blue" />}
              title="Agentic AI"
              desc="Intelligent conflict resolution and smart follow-up automation."
            />
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-32 bg-white/30 dark:bg-white/5 backdrop-blur-md border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-8 opacity-80 leading-relaxed">
            &quot;Everything in Explyra is designed to simplify complex workflows. Booking is our answer to the noise of scheduling.&quot;
            </h2>
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-1 bg-brand-blue rounded-full mb-2" />
                <span className="font-bold text-sm uppercase tracking-[0.3em]">Founded by Mitanshu Bhasin</span>
                <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Architect of Explyra</span>
            </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 opacity-50">
                <Calendar size={18} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Explyra Booking. All Rights Reserved.</span>
            </div>
            
            <div className="flex gap-8 text-[10px] font-bold opacity-50 uppercase tracking-[0.2em]">
                <Link href="/privacy" className="hover:opacity-100 transition-opacity">Privacy</Link>
                <Link href="/toc" className="hover:opacity-100 transition-opacity">Terms</Link>
                <Link href="/shop" className="hover:opacity-100 transition-opacity">Shop</Link>
                <a href="mailto:explyra@gmail.com" className="hover:opacity-100 transition-opacity">Contact</a>
            </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-10 rounded-[32px] bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-brand-blue/30 transition-all group backdrop-blur-sm">
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1B2235] shadow-sm flex items-center justify-center mb-8 border border-black/5 dark:border-white/10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 font-serif">{title}</h3>
      <p className="opacity-50 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

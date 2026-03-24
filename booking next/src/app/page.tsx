"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Booking3D from "@/components/Booking3D";
import { 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  Globe,
  Cpu,
  MousePointer2,
  CheckCircle2,
  Layout,
  Share2,
  TrendingUp,
  Infinity
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BookingLandingPage() {
  const { user, loading } = useAuth();
  const isDark = true;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B14] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 selection:bg-blue-500/30 font-sans ${isDark ? 'dark bg-[#080B14] text-white' : 'bg-[#F9FAFB] text-brand-ink'}`}>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Booking3D isDark={isDark} />
      </div>

      {/* Modern Glass Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-2xl border border-white/5 bg-white/5 dark:bg-black/20 backdrop-blur-2xl px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-12 transition-transform">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-lg tracking-wider block leading-tight font-serif uppercase">Explyra</span>
            <span className="text-[9px] font-bold opacity-40 tracking-[0.3em] uppercase -mt-1 block">Booking Engine</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
            {['Features', 'Intelligence', 'Security'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 hover:opacity-100 hover:text-blue-500 transition-all cursor-pointer">
                    {item}
                </a>
            ))}
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href={user ? "/dashboard.html" : "/login"} 
            className="px-6 py-2.5 rounded-xl bg-white dark:bg-blue-600 text-black dark:text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-600/20"
          >
            {user ? 'Dashboard' : 'Launch App'}
          </Link>
        </div>
      </nav>

      {/* Kinetic Hero */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-extrabold uppercase tracking-[0.3em] mb-12 border border-blue-500/20"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Next-Gen Agentic Scheduling v2.0
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium leading-none mb-12 tracking-tight max-w-5xl"
            >
                Orchestrate your <br /> 
                <span className="text-blue-600 italic">Timeline</span> with Code.
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl opacity-40 mb-16 max-w-2xl leading-relaxed font-light"
            >
                Unified booking for high-performance teams. Zero friction. <br className="hidden md:block"/> Absolute control. Pure Explyra intelligence.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-6 mb-24"
            >
              <Link 
                href={user ? "/dashboard.html" : "/login"} 
                className="group px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-600/40 transition-all"
              >
                Create My Page <ArrowRight size={18} />
              </Link>
              <Link 
                href="/track.html" 
                className="px-10 py-5 rounded-2xl bg-white/3 border border-white/10 font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-xl"
              >
                Find Meeting
              </Link>
            </motion.div>

            {/* Desktop Mockup Preview */}
            <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
               className="relative w-full max-w-6xl mx-auto"
            >
                <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(37,99,235,0.1)] group aspect-video">
                    <Image 
                        src="/booking_hero.png" 
                        alt="Interface" 
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#080B14] via-transparent to-transparent opacity-60" />
                </div>
                
                {/* Floating Stats Decors */}
                <div className="absolute top-20 -right-12 hidden lg:flex flex-col gap-4">
                    <StatBadge icon={<MousePointer2 size={14}/>} label="Auto-Sync" val="12.4ms" />
                    <StatBadge icon={<Infinity size={14}/>} label="Uptime" val="100%" />
                </div>
                <div className="absolute bottom-40 -left-12 hidden lg:flex flex-col gap-4">
                    <StatBadge icon={<Share2 size={14}/>} label="Pages Generated" val="450K+" />
                    <StatBadge icon={<TrendingUp size={14}/>} label="Lead Conversion" val="+42%" />
                </div>
            </motion.div>
        </div>
      </section>

      {/* Feature Section: The Grid */}
      <section className="py-32 px-6 bg-[#0B0F1A]/50 border-y border-white/5" id="features">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid lg:grid-cols-3 gap-8"
          >
            <FeatureBlock 
              icon={<Share2 className="text-blue-500" strokeWidth={1.5}/>}
              title="Dynamic SEO Pages"
              desc="Every user gets a high-performance booking link optimized for search rank. Be found on the first page."
              badge="SEO Ready"
            />
            <FeatureBlock 
              icon={<Cpu className="text-blue-500" strokeWidth={1.5}/>}
              title="Agentic Conflict Solver"
              desc="Our AI backend predicts schedule overlaps and intelligently suggests the best times for both parties."
              badge="AI Core"
            />
            <FeatureBlock 
              icon={<ShieldCheck className="text-blue-500" strokeWidth={1.5}/>}
              title="Encrypted Channels"
              desc="Client data never leaves the suite. End-to-end encryption for all meeting notes and booking details."
              badge="Secured"
            />
          </motion.div>
        </div>
      </section>

      {/* Feature Spotlight: Dynamic URLs */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1">
                <span className="text-blue-500 text-[10px] font-extrabold uppercase tracking-[0.4em] mb-6 block">The Explyra Advantage</span>
                <h3 className="text-4xl md:text-6xl font-serif font-medium mb-8 leading-[1.2]">
                    Your Portfolio, <br/> now with <span className="italic underline decoration-blue-500/20">Booking Power</span>.
                </h3>
                <p className="text-lg opacity-40 mb-12 leading-relaxed font-light max-w-lg">
                    Stop sending messy calendar links. Send a beautiful, branded Explyra URL that converts visitors into confirmed appointments. Dynamic metadata keeps your brand visible across social media previews.
                </p>
                <div className="space-y-4">
                    {['Automatic Timezone Sync', 'Instant SEO Indexing', 'Full Dashboard Access', 'Custom Profile Branding'].map(f => (
                        <div key={f} className="flex items-center gap-3 group">
                            <CheckCircle2 size={18} className="text-blue-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                            <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{f}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 relative">
                <div className="p-8 rounded-[40px] bg-linear-to-br from-blue-600/10 to-transparent border border-white/5 backdrop-blur-3xl">
                    <div className="bg-[#080B14] rounded-2xl p-6 border border-white/5 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex gap-1.5 font-bold text-[10px] tracking-[0.2em] opacity-30">
                                <Globe size={12}/> EXPLYRA.ME/USER
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                                <Layout size={14} className="text-blue-500"/>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-4 w-1/3 bg-white/5 rounded-full" />
                            <div className="h-10 w-full bg-white/5 rounded-2xl" />
                            <div className="h-32 w-full bg-blue-600/10 rounded-2xl border border-blue-500/20 flex items-center justify-center">
                                <Calendar size={32} className="text-blue-500 opacity-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Identity Reveal Footer */}
      <footer className="py-32 px-6 border-t border-white/5 bg-[#080B14] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
             <div className="flex flex-col items-center gap-6 mb-20 text-center">
                <div className="w-24 h-1 bg-blue-600 rounded-full mb-4" />
                <h4 className="text-3xl md:text-5xl font-serif italic opacity-80 max-w-3xl leading-relaxed">
                    Designed for architects of the future. Built on the Explyra Suite core.
                </h4>
             </div>
             
             <div className="flex flex-col md:flex-row justify-between w-full items-center gap-12 py-12 border-y border-white/5">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <Calendar size={20} className="text-blue-500" />
                        <span className="font-bold text-xl font-serif tracking-widest uppercase">Explyra</span>
                    </div>
                    <span className="text-[10px] font-bold opacity-30 tracking-[0.2em] uppercase ml-8 italic font-serif leading-none">Founded by Mitanshu Bhasin</span>
                </div>

                <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                    <Link href="/terms.html" className="hover:text-blue-500 hover:opacity-100 transition-all">Legal</Link>
                    <Link href="/privacy.html" className="hover:text-blue-500 hover:opacity-100 transition-all">Privacy</Link>
                    <a href="mailto:explyra@gmail.com" className="hover:text-blue-500 hover:opacity-100 transition-all">Architect</a>
                </div>
                
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-20">
                    <span>Part of Krishna Glass House</span>
                </div>
             </div>
             <p className="text-[9px] font-bold opacity-10 uppercase tracking-[0.5em] mt-20">
                &copy; MMXXVI EXPLYRA UNIFIED SUITE. ALL RIGHTS RESERVED.
             </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureBlock({ icon, title, desc, badge }: { icon: React.ReactNode, title: string, desc: string, badge: string }) {
  return (
    <motion.div 
        variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
        }}
        className="p-12 rounded-[50px] bg-white/2 border border-white/5 hover:border-blue-500/30 hover:bg-white/4 transition-all group backdrop-blur-xl"
    >
      <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[8px] font-extrabold uppercase tracking-widest mb-10 group-hover:bg-blue-500 group-hover:text-white transition-all">
        {badge}
      </div>
      <div className="w-20 h-20 rounded-3xl bg-[#1B2235] flex items-center justify-center mb-10 border border-white/5 group-hover:scale-110 transition-transform group-hover:bg-blue-600/10 group-hover:border-blue-500/20">
        <div className="transition-transform duration-500 group-hover:-rotate-12">
            {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold mb-6 font-serif tracking-tight text-white/90 group-hover:text-white transition-colors">{title}</h3>
      <p className="opacity-40 text-base leading-relaxed font-light group-hover:opacity-70 transition-opacity">{desc}</p>
    </motion.div>
  );
}

function StatBadge({ icon, label, val }: { icon: React.ReactNode, label: string, val: string }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#080B14]/80 border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                {icon}
            </div>
            <div className="flex flex-col pr-4">
                <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">{label}</span>
                <span className="text-sm font-bold tracking-tight">{val}</span>
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-[5vw] py-24 overflow-hidden pt-32">
      {/* Mesh Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_40%,rgba(21,70,192,0.07)_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_80%_30%,rgba(52,211,153,0.06)_0%,transparent_60%),radial-gradient(ellipse_40%_40%_at_60%_80%,rgba(167,139,250,0.06)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_70%_60%_at_20%_40%,rgba(91,138,245,0.15)_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_80%_30%,rgba(52,211,153,0.12)_0%,transparent_60%),radial-gradient(ellipse_40%_40%_at_60%_80%,rgba(167,139,250,0.12)_0%,transparent_60%)]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--bdr)_1px,transparent_1px),linear-gradient(90deg,var(--bdr)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_80%)] opacity-50 z-0" />

      {/* Particles (Simplified for React) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* We can add a particle component here later if needed, right now we'll keep it simple */}
      </div>

      <div className="relative z-10 max-w-[880px] mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-[var(--blue-g)] border border-[var(--blue-b)] text-[var(--blue)] text-[0.72rem] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-8"
        >
          <div className="w-[7px] h-[7px] rounded-full bg-[var(--blue)] animate-pulse" />
          Explyra Suite 2026
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-playfair text-[clamp(3rem,6vw,6rem)] font-bold leading-[1.06] tracking-[-0.025em] text-[var(--ink)] mb-6"
        >
          One Platform. <br />
          <span className="bg-gradient-to-br from-[var(--blue)] to-[var(--purp)] dark:from-[var(--blue2)] dark:to-[var(--purp2)] bg-clip-text text-transparent">
            Infinite
          </span>{" "}
          <em>Possibilities.</em>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[1.1rem] text-[var(--ink3)] max-w-[600px] mx-auto mb-10 leading-[1.8] font-light"
        >
          Stop juggling ten different apps. Explyra unifies your CRM, expense tracking, HR, developer tools, and team collaboration into a single, beautifully designed ecosystem.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <Link
            href="/company"
            className="bg-[var(--blue)] text-white px-[2.2rem] py-[0.9rem] rounded-[var(--r)] text-[0.95rem] font-semibold transition-all hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_color-mix(in_srgb,var(--blue)_35%,transparent)] inline-flex items-center gap-2"
          >
            Start Free Trial <HiArrowRight />
          </Link>
          <button
            onClick={() => {/* Implement video modal trigger here */}}
            className="bg-transparent text-[var(--ink2)] px-[2rem] py-[0.9rem] rounded-[var(--r)] text-[0.95rem] font-medium border-[1.5px] border-[var(--bdr2)] transition-all hover:border-[var(--blue)] hover:text-[var(--blue)] hover:bg-[var(--blue-g)] inline-flex items-center gap-2"
          >
            <FaPlay className="text-[0.8rem]" /> Watch Demo
          </button>
        </motion.div>

        {/* Suite Pills */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[0.78rem] font-semibold border transition-all cursor-default hover:-translate-y-0.5 hover:shadow-[var(--s2)] bg-[var(--blue-g)] border-[var(--blue-b)] text-[var(--blue)]">
            <span className="text-[1.1rem]">💳</span> Expense
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[0.78rem] font-semibold border transition-all cursor-default hover:-translate-y-0.5 hover:shadow-[var(--s2)] bg-[var(--teal-g)] border-[var(--teal-b)] text-[var(--teal)]">
             <span className="text-[1.1rem]">🤝</span> CRM
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[0.78rem] font-semibold border transition-all cursor-default hover:-translate-y-0.5 hover:shadow-[var(--s2)] bg-[var(--amb-g)] border-[var(--amb-b)] text-[#D97706] dark:text-[#F59E0B]">
             <span className="text-[1.1rem]">📅</span> Booking
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[0.78rem] font-semibold border transition-all cursor-default hover:-translate-y-0.5 hover:shadow-[var(--s2)] bg-[var(--purp-g)] border-[var(--purp-b)] text-[var(--purp)]">
             <span className="text-[1.1rem]">⚡</span> Dev Tools
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[0.78rem] font-semibold border transition-all cursor-default hover:-translate-y-0.5 hover:shadow-[var(--s2)] bg-[var(--rose-g)] border-[var(--rose-b)] text-[#E11D48] dark:text-[#FB7185]">
             <span className="text-[1.1rem]">🧠</span> AI Learning
          </div>
        </motion.div>
      </div>
    </section>
  );
}

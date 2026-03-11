"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

export function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[300] h-16 flex items-center px-[5vw] bg-white/90 dark:bg-[#080B14]/88 backdrop-blur-[20px] border-b border-[var(--bdr)] transition-colors duration-400 gap-8">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 shrink-0">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-[var(--blue)] flex items-center justify-center">
          <svg
            className="w-[18px] h-[18px] fill-transparent stroke-white"
            strokeWidth="2.2"
            strokeLinecap="round"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="font-playfair text-[1.25rem] font-bold tracking-[0.03em] text-[var(--ink)]">
          Explyra
        </span>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-7 flex-1 justify-center">
        <li>
          <Link
            href="/"
            className="text-[0.82rem] font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-colors tracking-[0.02em]"
          >
            Platform
          </Link>
        </li>
        <li className="relative group h-full flex items-center">
          <div className="cursor-pointer flex items-center gap-1.5 text-[0.82rem] font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-colors tracking-[0.02em]">
            Solutions <FaChevronDown className="text-[0.65rem] transition-transform group-hover:rotate-180" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-[10px] bg-[var(--bg2)] dark:bg-[var(--bg3)] border border-[var(--bdr)] dark:border-[var(--bdr2)] rounded-xl w-[240px] p-3 shadow-[var(--s3)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 grid grid-cols-1 gap-1">
            <Link
              href="/crm"
              className="flex items-center gap-3 p-2.5 rounded-lg text-[0.85rem] font-medium text-[var(--ink2)] hover:bg-[var(--blue-g)] hover:text-[var(--blue)] hover:translate-x-1 transition-all"
            >
              <span className="w-6 text-center text-base">🤝</span> CRM System
            </Link>
            <Link
              href="/health-manager"
              className="flex items-center gap-3 p-2.5 rounded-lg text-[0.85rem] font-medium text-[var(--ink2)] hover:bg-[var(--blue-g)] hover:text-[var(--blue)] hover:translate-x-1 transition-all"
            >
              <span className="w-6 text-center text-base">🏥</span> Health Manager
            </Link>
            <Link
              href="/attendance"
              className="flex items-center gap-3 p-2.5 rounded-lg text-[0.85rem] font-medium text-[var(--ink2)] hover:bg-[var(--blue-g)] hover:text-[var(--blue)] hover:translate-x-1 transition-all"
            >
              <span className="w-6 text-center text-base">⏰</span> Attendance Tracking
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-3 p-2.5 rounded-lg text-[0.85rem] font-medium text-[var(--ink2)] hover:bg-[var(--blue-g)] hover:text-[var(--blue)] hover:translate-x-1 transition-all"
            >
              <span className="w-6 text-center text-base">💼</span> Expense Manager
            </Link>
          </div>
        </li>
        <li>
          <Link
            href="/pricing"
            className="text-[0.82rem] font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-colors tracking-[0.02em]"
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            href="/company"
            className="text-[0.82rem] font-medium text-[var(--ink3)] hover:text-[var(--ink)] transition-colors tracking-[0.02em]"
          >
            Company
          </Link>
        </li>
      </ul>

      {/* Right Actions */}
      <div className="flex items-center gap-3.5 shrink-0 ml-auto md:ml-0">
        {mounted && (
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 bg-[var(--bg3)] border border-[var(--bdr2)] rounded-full px-2 py-1.5 cursor-pointer transition-colors hover:border-[var(--blue)]"
            aria-label="Toggle Theme"
          >
            <span className="text-[0.72rem] font-semibold text-[var(--ink3)] tracking-[0.05em] uppercase hidden sm:block">
              {currentTheme === "dark" ? "Dark" : "Light"}
            </span>
            <div className="w-8 h-[18px] rounded-full bg-[var(--bg4)] dark:bg-[var(--blue)] relative transition-colors">
              <div
                className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  currentTheme === "dark" ? "translate-x-[14px]" : "translate-x-[2px]"
                }`}
              />
            </div>
          </button>
        )}

        <Link
          href="/login"
          className="hidden md:inline-flex bg-[var(--blue)] text-white px-5 py-2 rounded-lg text-[0.82rem] font-semibold tracking-[0.01em] transition-all hover:brightness-110 hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(21,70,192,0.35)] whitespace-nowrap"
        >
          Sign In
        </Link>
        
        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-[var(--ink)] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-[#080B14] border-b border-[var(--bdr)] p-5 flex flex-col gap-4 shadow-lg md:hidden"
          >
            <Link href="/" className="text-[0.9rem] font-medium text-[var(--ink)] p-2">Platform</Link>
            <Link href="/crm" className="text-[0.9rem] font-medium text-[var(--ink)] p-2">Solutions</Link>
            <Link href="/pricing" className="text-[0.9rem] font-medium text-[var(--ink)] p-2">Pricing</Link>
            <Link href="/company" className="text-[0.9rem] font-medium text-[var(--ink)] p-2">Company</Link>
            <Link href="/login" className="bg-[var(--blue)] text-white text-center rounded-lg p-3 font-semibold mt-2">Sign In / Register</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

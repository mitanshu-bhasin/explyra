"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Sun, Moon,
} from "lucide-react";

const PRODUCTS = [
  { icon: "💼", label: "Expense", desc: "Smart tracking", href: "/app", color: "var(--blue)" },
  { icon: "📈", label: "CRM", desc: "Pipeline tool", href: "/crm/index.html", color: "var(--blue)" },
  { icon: "📄", label: "Invoice", desc: "Billing v2", href: "/Ino software/ino.html", color: "var(--blue)" },
  { icon: "✅", label: "Attendance", desc: "Geofenced check-in", href: "/attendance/index.html", color: "var(--blue)" },
  { icon: "🏃", label: "Health", desc: "AI companion", href: "/health-manager/index.html", color: "var(--teal)" },
  { icon: "📅", label: "Booking", desc: "Auto-scheduling", href: "https://book.explyra.me", color: "var(--blue)" },
  { icon: "📚", label: "Learning", desc: "Master future skills", href: "/explyra-learning/index.html", color: "var(--amber)" },
  { icon: "⚡", label: "Developers", desc: "Utils & APIs", href: "#developers", color: "var(--purp)" },
];

const SOLUTIONS = [
  { icon: "💼", label: "Expense Admin", desc: "Finance operations", href: "/solutions/expense-manager.html", color: "var(--blue)" },
  { icon: "✅", label: "Attendance Hub", desc: "HR & Security", href: "/solutions/attendance-system.html", color: "var(--blue)" },
  { icon: "🏭", label: "Manufacturing", desc: "Supply chain ERP", href: "/solutions/manufacturing.html", color: "var(--amber)" },
  { icon: "🏃", label: "Corporate Health", desc: "Wellness suite", href: "/solutions/health.html", color: "var(--teal)" },
  { icon: "📈", label: "Enterprise CRM", desc: "Sales & Ops v2", href: "/solutions/crm.html", color: "var(--blue)" },
  { icon: "📅", label: "Booking Hub", desc: "Service providers", href: "/solutions/booking-system.html", color: "var(--blue)" },
  { icon: "🌐", label: "Global DNS", desc: "Edge infrastructure", href: "/solutions/dns.html", color: "var(--blue)" },
  { icon: "⚡", label: "Dev Cloud", desc: "Custom APIs", href: "/solutions/developers.html", color: "var(--purp)" }
];

const RESOURCES = [
  { icon: "📅", label: "Events", desc: "Community meetups", href: "/events/index.html", color: "var(--blue)" },
  { icon: "📢", label: "Updates", desc: "What's new in Explyra", href: "/updates/index.html", color: "var(--blue)" },
  { icon: "💰", label: "Pricing", desc: "Flexible plans for teams", href: "/pricing", color: "var(--blue)" },
  { icon: "🎧", label: "Help Desk", desc: "24/7 technical support", href: "/support.html", color: "var(--blue)" },
  { icon: "🤝", label: "Our Team", desc: "Meet the engineers", href: "/team.html", color: "var(--blue)" },
];

const NAV_LINKS = [
  { label: "Products", hasDropdown: true, dropdownKey: "products" },
  { label: "Solutions", hasDropdown: true, dropdownKey: "solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/company" },
  { label: "Blog", href: "https://explyra.me/updates/", external: true },
];

export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile on route change
  if (mobileOpen && typeof window !== "undefined") {
    setMobileOpen(false);
  }

  const isDark = theme === "dark";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-2000 h-16 flex items-center px-[5vw] gap-8 transition-all duration-300"
        style={{
          background: scrolled
            ? isDark ? "rgba(8,11,20,.95)" : "rgba(248,247,244,.95)"
            : isDark ? "rgba(8,11,20,.7)" : "rgba(248,247,244,.7)",
          backdropFilter: "blur(20px) saturate(160%)",
          borderBottom: `1px solid ${scrolled ? "var(--bdr)" : "transparent"}`,
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
            <Image
              src="https://explyra.me/assets/images/explyra_logo.png"
              alt="Explyra"
              width={32}
              height={32}
              unoptimized
            />
          </div>
          <span
            className="text-xl font-bold tracking-wide"
            style={{ fontFamily: "var(--font-playfair), serif", color: "var(--ink)" }}
          >
            Explyra
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center justify-center gap-9 list-none flex-1">
          {NAV_LINKS.map((item) =>
            item.hasDropdown ? (
              <li
                key={item.label}
                className="relative flex items-center h-16"
                onMouseEnter={() => setActiveDropdown(item.dropdownKey!)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 text-[.82rem] font-medium transition-colors duration-200"
                  style={{ color: activeDropdown === item.dropdownKey ? "var(--ink)" : "var(--ink3)" }}
                >
                  {item.label}
                  <ChevronDown
                    className="w-3 h-3 transition-transform duration-300"
                    style={{ transform: activeDropdown === item.dropdownKey ? "rotate(180deg)" : "rotate(0)" }}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === item.dropdownKey && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 flex overflow-hidden rounded-xl shadow-2xl"
                      style={{
                        background: isDark ? "rgba(18,22,38,.98)" : "var(--bg2)",
                        border: "1px solid var(--bdr)",
                        width: item.dropdownKey === "products" ? "700px" : "520px",
                        boxShadow: "0 16px 40px rgba(0,0,0,.18)",
                        zIndex: 100,
                      }}
                    >
                      {/* Side hero panel */}
                      <div
                        className="w-60 shrink-0 p-6 flex flex-col gap-4"
                        style={{ background: "var(--bg3)", borderRight: "1px solid var(--bdr)" }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0" style={{ background: "var(--bg2)", border: "1px solid var(--bdr)" }}>
                            <Image src="https://explyra.me/assets/images/explyra_logo.png" alt="Explyra" width={40} height={40} unoptimized />
                          </div>
                          <div>
                            <p className="text-[.9rem] font-bold" style={{ color: "var(--ink)" }}>Explyra Suite</p>
                            <p className="text-[.75rem]" style={{ color: "var(--ink3)" }}>
                              {item.dropdownKey === "products" ? "10+ integrated tools" : "Industry solutions"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-auto pt-4 space-y-1" style={{ borderTop: "1px solid var(--bdr)" }}>
                          {[
                            { icon: "🚀", label: "Get Started Free", href: "/login" },
                            { icon: "📖", label: "Documentation", href: "https://explyra.me/docs" },
                            { icon: "💬", label: "Contact Sales", href: "/contact" },
                          ].map(({ icon, label, href }) => (
                            <Link
                              key={label}
                              href={href}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[.82rem] font-medium transition-all duration-200"
                              style={{ color: "var(--ink)" }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg2)"; (e.currentTarget as HTMLElement).style.color = "var(--blue)"; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                            >
                              <span>{icon}</span>{label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Main grid */}
                      <div className="flex-1 p-5">
                        <span className="text-[.62rem] font-black uppercase tracking-widest ml-2 mb-3 block" style={{ color: "var(--ink4)" }}>
                          {item.dropdownKey === "products" ? "All Products" : "By Industry / Use Case"}
                        </span>
                        <div className={`grid gap-1 ${item.dropdownKey === "products" ? "grid-cols-2" : "grid-cols-1"}`}>
                          {(item.dropdownKey === "products" ? PRODUCTS : item.dropdownKey === "solutions" ? SOLUTIONS : RESOURCES).map(({ icon, label, desc, href, color }) => (
                            <Link
                              key={label}
                              href={href}
                              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group"
                              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--blue-g)"}
                              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                            >
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-lg" style={{ background: "var(--bg3)", color: color ?? "var(--blue)" }}>
                                {icon}
                              </div>
                              <div>
                                <p className="text-[.875rem] font-bold leading-tight" style={{ color: "var(--ink)" }}>{label}</p>
                                <p className="text-[.75rem] leading-snug" style={{ color: "var(--ink3)" }}>{desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href!}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-[.82rem] font-medium transition-colors duration-200"
                  style={{ color: pathname === item.href ? "var(--ink)" : "var(--ink3)" }}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0 ml-auto lg:ml-0">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[.72rem] font-semibold cursor-pointer transition-all"
            style={{ background: "var(--bg3)", border: "1px solid var(--bdr2)", color: "var(--ink3)" }}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {isDark ? "Light" : "Dark"}
          </button>

          <Link
            href="/login"
            className="hidden lg:inline-flex text-[.82rem] font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ color: "var(--ink3)" }}
          >
            Sign in
          </Link>
          <Link
            href="/app"
            className="inline-flex items-center text-[.82rem] font-semibold px-5 py-2 rounded-lg text-white transition-all"
            style={{ background: "var(--blue)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = ""; (e.currentTarget as HTMLElement).style.transform = ""; }}
          >
            Try Free
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "var(--ink)" }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-1999 w-80 flex flex-col pt-20 pb-8 px-6 overflow-y-auto"
            style={{ background: "var(--bg2)", borderLeft: "1px solid var(--bdr)" }}
          >
            <div className="space-y-1">
              {[...PRODUCTS, ...SOLUTIONS, ...RESOURCES].map(({ label, href, icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm"
                  style={{ color: "var(--ink)" }}
                >
                  <span className="w-4 h-4 shrink-0 text-base flex items-center justify-center" style={{ color: "var(--blue)" }}>{icon}</span>
                  {label}
                </Link>
              ))}
              <hr style={{ borderColor: "var(--bdr)", margin: "1rem 0" }} />
              {[{ label: "Pricing", href: "/pricing" }, { label: "Company", href: "/company" }, { label: "Contact", href: "/contact" }].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="block px-4 py-3 rounded-xl font-medium text-sm transition-colors"
                  style={{ color: "var(--ink)" }}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="mt-auto space-y-3">
              <Link href="/login" className="block w-full text-center py-2.5 rounded-xl font-semibold text-sm border" style={{ color: "var(--ink)", borderColor: "var(--bdr2)" }}>Sign In</Link>
              <Link href="/app" className="block w-full text-center py-2.5 rounded-xl font-semibold text-sm text-white" style={{ background: "var(--blue)" }}>Try Free</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

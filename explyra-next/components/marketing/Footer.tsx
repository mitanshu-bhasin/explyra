"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Github, Instagram, Youtube, Mail, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  solutions: [
    { label: "Expense Tracker", href: "#expense" },
    { label: "Explyra™ DNS", href: "/dns/index.html" },
    { label: "Explyra™ CRM", href: "/crm/index.html" },
    { label: "Health Companion", href: "/health-manager/index.html" },
    { label: "AI Learning", href: "/explyra-learning/index.html" },
    { label: "Developer Tools", href: "/developers/index.html" },
    { label: "Attendance Portal", href: "/attendance/index.html" },
    { label: "Service Booking", href: "https://book.explyra.me" },
    { label: "Explyra™ ERP", href: "/manufacturing/index.html" },
    { label: "Invoice Software", href: "/Ino software/ino.html" },
  ],
  compare: [
    { label: "vs Zoho", href: "/compare/explyra-vs-zoho.html" },
    { label: "vs HubSpot", href: "/compare/explyra-vs-hubspot.html" },
    { label: "vs Notion", href: "/compare/explyra-vs-notion.html" },
    { label: "vs ClickUp", href: "/compare/explyra-vs-clickup.html" },
    { label: "vs Google", href: "/compare/explyra-vs-google-workspace.html" },
    { label: "vs Odoo", href: "/compare/explyra-vs-odoo.html" },
  ],
  resources: [
    { label: "Documentation", href: "/docs/index.html" },
    { label: "API Reference", href: "/docs/api-e.html" },
    { label: "Help Desk", href: "/support.html" },
    { label: "Events Portal", href: "/events/index.html" },
    { label: "Integrations", href: "/integrations/index.html" },
    { label: "System Status", href: "/status/index.html" },
    { label: "Compare Explyra™", href: "/compare/index.html" },
    { label: "Community Forum", href: "/community-hub/index.html" },
  ],
  company: [
    { label: "Our Team", href: "/team.html" },
    { label: "Pricing Plans", href: "/pricing" },
    { label: "Submit Business (₹29)", href: "/directories/submit.html" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers.html" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "License", href: "/license.html" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies.html" },
  ],
  download: [
    { label: "Android", href: "/android.html" },
    { label: "iOS", href: "/ios.html" }
  ]
};

const SOCIALS = [
  { icon: Twitter, href: "https://x.com/explyras", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/explyra/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/Explyra", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/explyras", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@explyras", label: "YouTube" },
];

export default function MarketingFooter() {
  return (
    <footer className="pt-24 pb-8" style={{ background: "var(--bg)", borderTop: "1px solid var(--bdr)" }}>
      <div className="mkt-container px-[5vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <Image src="https://explyra.me/assets/images/explyra_logo.png" alt="Explyra" width={32} height={32} unoptimized />
              </div>
              <span className="text-xl font-bold tracking-wide" style={{ fontFamily: "var(--font-playfair), serif", color: "var(--ink)" }}>
                Explyra
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink3)", maxWidth: "320px" }}>
              The unified SaaS ecosystem for modern enterprises. Manage expenses, CRM, health, AI learning, and developer tools in one powerful platform.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "var(--bg3)", color: "var(--ink3)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--blue-g)"; (e.currentTarget as HTMLElement).style.color = "var(--blue)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg3)"; (e.currentTarget as HTMLElement).style.color = "var(--ink3)"; }}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Cols */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-5">
              <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--ink)" }}>{category.replace('_', ' ')}</h4>
              <ul className="space-y-3 list-none p-0 m-0">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "var(--ink3)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--blue)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--ink3)"}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Row */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-4" style={{ borderTop: "1px solid var(--bdr)", borderBottom: "1px solid var(--bdr)" }}>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <a href="mailto:explyra@gmail.com" className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: "var(--ink3)" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--blue)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--ink3)"}>
              <Mail className="w-4 h-4" /> explyra@gmail.com
            </a>
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--ink3)" }}>
              <MapPin className="w-4 h-4" /> New Delhi, IN
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="text-[.65rem] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--ink4)" }}>System Status</div>
              <a href="https://status.explyra.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors" style={{ background: "var(--teal-g)", color: "var(--teal)", border: "1px solid var(--teal-b)" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--teal-b)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--teal-g)"}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> All Systems Operational
              </a>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4 text-xs" style={{ color: "var(--ink4)" }}>
          <p>© {new Date().getFullYear()} Explyra Cloud Ecosystem. All rights reserved.</p>
          <p>Made with ❤️ by <a href="https://mitanshu.tech" target="_blank" rel="noopener noreferrer" className="font-bold underline transition-colors hover:text-blue-500">Mitanshu Bhasin</a></p>
        </div>
      </div>
    </footer>
  );
}

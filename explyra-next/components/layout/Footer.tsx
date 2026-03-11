"use client";

import Link from "next/link";
import { FaShieldAlt, FaUserLock, FaLock, FaChevronDown, FaGithub, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { useState } from "react";

export function Footer() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <footer className="bg-[var(--bg2)] dark:bg-[var(--bg3)] pt-16 pb-8 border-t border-[var(--bdr)] mt-auto">
      <div className="max-w-[1240px] mx-auto px-[5vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-y-10 lg:gap-8 mb-12">
        {/* Brand Column */}
        <div className="lg:col-span-2 pr-0 lg:pr-8">
          <span className="font-playfair text-2xl font-bold text-[var(--ink)] tracking-wider mb-4 block">
            Explyra
          </span>
          <p className="text-[0.9rem] text-[var(--ink3)] leading-relaxed mb-6 max-w-sm">
            One Platform. Everything. The ultimate SaaS ecosystem for developers, teams, and enterprises.
          </p>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-[var(--ink4)] border border-[var(--bdr)] w-max px-3 py-1.5 rounded-full uppercase tracking-wider">
              <FaShieldAlt className="text-[var(--blue)]" /> HIPAA READY Compliant
            </div>
            <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-[var(--ink4)] border border-[var(--bdr)] w-max px-3 py-1.5 rounded-full uppercase tracking-wider">
              <FaUserLock className="text-[var(--teal)]" /> GDPR Compliant
            </div>
            <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-[var(--ink4)] border border-[var(--bdr)] w-max px-3 py-1.5 rounded-full uppercase tracking-wider">
              <FaLock className="text-[var(--purp)]" /> SSL Secured
            </div>
          </div>
        </div>

        {/* Links Columns */}
        {[
          {
            title: "Solutions",
            links: [
              { label: "Expense Tracker", href: "/admin" },
              { label: "Explyra CRM", href: "/crm" },
              { label: "Health Companion", href: "/health-manager" },
              { label: "AI Learning", href: "/explyra-learning" },
              { label: "Developer Tools", href: "/developers" },
              { label: "Utility Hub", href: "/Utilites" },
              { label: "Attendance Portal", href: "/attendance" },
              { label: "Service Booking", href: "https://book.explyra.me" },
            ],
          },
          {
            title: "Compare",
            links: [
              { label: "vs Zoho", href: "/compare/explyra-vs-zoho" },
              { label: "vs HubSpot", href: "/compare/explyra-vs-hubspot" },
              { label: "vs Notion", href: "/compare/explyra-vs-notion" },
              { label: "vs ClickUp", href: "/compare/explyra-vs-clickup" },
              { label: "vs Google", href: "/compare/explyra-vs-google-workspace" },
              { label: "vs Odoo", href: "/compare/explyra-vs-odoo" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "Documentation", href: "/docs" },
              { label: "Help Desk", href: "/support" },
              { label: "Events Portal", href: "/events" },
              { label: "Integrations", href: "/integrations" },
              { label: "System Status", href: "/status" },
              { label: "Community Forum", href: "/community-hub" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Our Team", href: "/team" },
              { label: "Pricing Plans", href: "/pricing" },
              { label: "Contact Us", href: "/contact" },
              { label: "Careers", href: "/careers" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ],
          },
        ].map((column) => (
          <div key={column.title} className="border-b border-[var(--bdr)] sm:border-none pb-4 sm:pb-0">
            <h4
              className="text-[0.95rem] font-semibold text-[var(--ink)] mb-4 flex justify-between items-center sm:cursor-default cursor-pointer tracking-wide"
              onClick={() => toggleAccordion(column.title)}
            >
              {column.title}
              <FaChevronDown
                className={`sm:hidden text-xs transition-transform ${
                  activeAccordion === column.title ? "rotate-180" : ""
                }`}
              />
            </h4>
            <ul
              className={`${
                activeAccordion === column.title ? "flex" : "hidden"
              } sm:flex flex-col gap-3 font-medium`}
            >
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.85rem] text-[var(--ink3)] hover:text-[var(--blue)] transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1240px] mx-auto px-[5vw] flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--bdr)] gap-4">
        <p className="text-[0.8rem] text-[var(--ink4)] font-medium text-center md:text-left">
          © {new Date().getFullYear()} Explyra · Built with ♥ by Mitanshu Bhasin · All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/Explyra" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg)] border border-[var(--bdr)] text-[var(--ink3)] hover:text-[var(--blue)] hover:-translate-y-1 hover:border-[var(--blue)] transition-all">
            <FaGithub />
          </a>
          <a href="https://x.com/explyras" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg)] border border-[var(--bdr)] text-[var(--ink3)] hover:text-[var(--blue)] hover:-translate-y-1 hover:border-[var(--blue)] transition-all">
            <FaTwitter />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61584891033070&sk=directory_personal_details" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg)] border border-[var(--bdr)] text-[var(--ink3)] hover:text-[var(--blue)] hover:-translate-y-1 hover:border-[var(--blue)] transition-all">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/explyras" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg)] border border-[var(--bdr)] text-[var(--ink3)] hover:text-[var(--blue)] hover:-translate-y-1 hover:border-[var(--blue)] transition-all">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@explyras" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg)] border border-[var(--bdr)] text-[var(--ink3)] hover:text-[var(--blue)] hover:-translate-y-1 hover:border-[var(--blue)] transition-all">
            <FaYoutube />
          </a>
          <a href="https://www.linkedin.com/company/explyra/" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg)] border border-[var(--bdr)] text-[var(--ink3)] hover:text-[var(--blue)] hover:-translate-y-1 hover:border-[var(--blue)] transition-all">
            <FaLinkedin />
          </a>
           <a href="https://www.threads.com/@explyras" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--bg)] border border-[var(--bdr)] text-[var(--ink3)] hover:text-[var(--blue)] hover:-translate-y-1 hover:border-[var(--blue)] transition-all">
            <FaThreads />
          </a>
        </div>
      </div>
    </footer>
  );
}

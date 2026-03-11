"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

const supportFeatures = [
  {
    icon: "📖",
    title: "Documentation",
    desc: "Comprehensive guides, API references, and tutorials for every Explyra product. Search, browse, and get answers instantly.",
    link: "/docs",
    linkText: "Browse Docs",
  },
  {
    icon: "💬",
    title: "Live Chat Support",
    desc: "Connect with our support team in real time. Available for critical issues, onboarding help, and product questions.",
    link: "/contact",
    linkText: "Start Chat",
  },
  {
    icon: "🎫",
    title: "Ticketing System",
    desc: "Submit a support ticket for non-urgent requests. Track status, get updates, and resolve issues with full transparency.",
    link: "/contact",
    linkText: "Open Ticket",
  },
  {
    icon: "🤖",
    title: "AI Support Bot",
    desc: "24/7 intelligent assistant that can answer product questions, walk you through setup, and escalate to humans when needed.",
    link: "/contact",
    linkText: "Try Now",
  },
  {
    icon: "🎓",
    title: "Onboarding Sessions",
    desc: "Scheduled walkthroughs for enterprise clients. Our team will set up your workspace, train your team, and ensure a smooth launch.",
    link: "/contact",
    linkText: "Schedule",
  },
  {
    icon: "🌐",
    title: "Community Forum",
    desc: "Connect with other Explyra users, share tips, report issues, and stay updated on new features and product announcements.",
    link: "/community-hub",
    linkText: "Join Community",
  },
];

export function HelpDesk() {
  return (
    <section className="px-[5vw] py-24 bg-[var(--bg)] border-t border-[var(--bdr)]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-[0.7rem] font-bold tracking-[0.3em] uppercase text-[var(--slate)] mb-3">
            <div className="w-[20px] h-[2px] bg-current rounded-full" />
            🛡️ Help Desk
            <div className="w-[20px] h-[2px] bg-current rounded-full" />
          </div>
          <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--ink)] mb-4">
            We've got your back, <em>always.</em>
          </h2>
          <p className="text-[0.95rem] text-[var(--ink3)] leading-[1.75] max-w-[520px] mx-auto font-light">
            Dedicated support for every product in the Explyra Suite. Get help when you need it — however you need it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportFeatures.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[var(--surf)] dark:bg-[var(--bg3)] p-8 rounded-[var(--r)] border border-[var(--bdr)] transition-all duration-300 hover:shadow-[var(--s3)] hover:-translate-y-1 hover:border-[var(--slate)] group"
            >
              <div className="text-[2rem] mb-5">{feat.icon}</div>
              <h3 className="font-playfair font-bold text-[1.15rem] text-[var(--ink)] mb-3">
                {feat.title}
              </h3>
              <p className="text-[0.88rem] text-[var(--ink3)] leading-[1.7] font-light mb-6">
                {feat.desc}
              </p>
              <Link
                href={feat.link}
                className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-[var(--blue)] transition-all group-hover:gap-2.5"
              >
                {feat.linkText} <HiArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

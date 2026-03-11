"use client";

import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { 
  FaMoneyBillWave, 
  FaUsers, 
  FaCalendarCheck, 
  FaCode, 
  FaBrain, 
  FaWrench,
  FaHeadset,
  FaFileInvoiceDollar,
  FaIndustry
} from "react-icons/fa";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import Link from "next/link";

const features = [
  {
    title: "Explyra CRM",
    desc: "Manage leads, pipelines, and customer relationships. Built for high-velocity sales teams with AI scoring.",
    icon: <FaUsers />,
    colorClass: "bg-[var(--teal-g)] border-[var(--teal-b)] text-[var(--teal)]",
    borderColorClass: "var(--teal)",
    href: "/crm"
  },
  {
    title: "Expense Tracker",
    desc: "Automate expense reporting, receipt scanning, and corporate card management with proactive anomaly detection.",
    icon: <FaMoneyBillWave />,
    colorClass: "bg-[var(--blue-g)] border-[var(--blue-b)] text-[var(--blue)]",
    borderColorClass: "var(--blue)",
    href: "/admin"
  },
  {
    title: "Health Companion",
    desc: "Monitor wellness, get AI-driven health recommendations, and track medical records securely (HIPAA Ready).",
    icon: <MdOutlineHealthAndSafety />,
    colorClass: "bg-[#FCE7F3] border-[#FBCFE8] text-[#DB2777] dark:bg-[rgba(219,39,119,0.1)] dark:border-[rgba(219,39,119,0.2)]",
    borderColorClass: "#DB2777",
    href: "/health-manager"
  },
  {
    title: "AI Learning",
    desc: "Upskill your team with personalized, AI-generated curriculum, coding challenges, and progress tracking.",
    icon: <FaBrain />,
    colorClass: "bg-[var(--purp-g)] border-[var(--purp-b)] text-[var(--purp)]",
    borderColorClass: "var(--purp)",
    href: "/explyra-learning"
  },
  {
    title: "Developer Tools",
    desc: "Formatters, encoders, generators, and API testing suites. Everything a developer needs, running locally in the browser.",
    icon: <FaCode />,
    colorClass: "bg-[var(--slt-g)] border-[var(--slt-b)] text-[var(--slate)]",
    borderColorClass: "var(--slate)",
    href: "/developers"
  },
  {
    title: "Utility Hub",
    desc: "Everyday tools consolidated: format converters, advanced calculators, and secure password managers.",
    icon: <FaWrench />,
    colorClass: "bg-[#FEF9C3] border-[#FEF08A] text-[#CA8A04] dark:bg-[rgba(202,138,4,0.1)] dark:border-[rgba(202,138,4,0.2)]",
    borderColorClass: "#CA8A04",
    href: "/Utilites"
  },
  {
    title: "HR & Attendance",
    desc: "Seamless clock-ins, leave management, and payroll integrations. Keep your workforce synchronized.",
    icon: <FaCalendarCheck />,
    colorClass: "bg-[#E0E7FF] border-[#C7D2FE] text-[#4F46E5] dark:bg-[rgba(79,70,229,0.1)] dark:border-[rgba(79,70,229,0.2)]",
    borderColorClass: "#4F46E5",
    href: "/attendance"
  },
  {
    title: "Service Booking",
    desc: "Streamlined appointment scheduling for service businesses. Reduce no-shows with automated SMS and email reminders.",
    icon: <FaHeadset />,
    colorClass: "bg-[#FFEDD5] border-[#FED7AA] text-[#EA580C] dark:bg-[rgba(234,88,12,0.1)] dark:border-[rgba(234,88,12,0.2)]",
    borderColorClass: "#EA580C",
    href: "https://book.explyra.me"
  },
  {
    title: "Invoicing & Billing",
    desc: "Professional invoice generation, recurring billing, and multi-currency payment gateway integrations.",
    icon: <FaFileInvoiceDollar />,
    colorClass: "bg-[#DCFCE7] border-[#BBF7D0] text-[#16A34A] dark:bg-[rgba(22,163,74,0.1)] dark:border-[rgba(22,163,74,0.2)]",
    borderColorClass: "#16A34A",
    href: "#"
  },
];

export function FeaturesGrid() {
  return (
    <section className="px-[5vw] py-20 bg-[var(--bg2)] border-t border-[var(--bdr)]">
      <div className="max-w-[1250px] mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 text-[0.7rem] font-bold tracking-[0.3em] uppercase text-[var(--blue)] mb-3">
            <div className="w-[20px] h-[2px] bg-current rounded-full" />
            The Ecosystem
            <div className="w-[20px] h-[2px] bg-current rounded-full" />
          </div>
          <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--ink)] mb-3">
            Replace your stack.{" "}
            <em>Save thousands.</em>
          </h2>
          <p className="text-[0.95rem] text-[var(--ink3)] leading-[1.75] max-w-[520px] mx-auto font-light">
            Nine powerful applications. One subscription. One data model. Eliminate integration headaches and data silos forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-[var(--surf)] dark:bg-[var(--bg3)] border border-[var(--bdr)] rounded-[14px] p-8 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--s3)] relative overflow-hidden"
              style={{ "--card-clr": feat.borderColorClass } as React.CSSProperties}
            >
              {/* Top border highlight on hover */}
              <div 
                className="absolute top-0 left-0 right-0 h-[3px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ backgroundColor: feat.borderColorClass }}
              />
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[1.4rem] mb-5 border ${feat.colorClass}`}>
                {feat.icon}
              </div>
              
              <h3 className="font-playfair text-[1.2rem] font-bold text-[var(--ink)] mb-2">
                {feat.title}
              </h3>
              
              <p className="text-[0.84rem] text-[var(--ink3)] leading-[1.7] font-light">
                {feat.desc}
              </p>

              <Link
                href={feat.href}
                className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold mt-5 transition-all group-hover:gap-2.5"
                style={{ color: feat.borderColorClass }}
              >
                Learn more <HiArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

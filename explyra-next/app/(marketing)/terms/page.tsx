"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="px-[5vw] pt-32 pb-16 text-center relative overflow-hidden bg-[var(--bg)]">
        <div className="absolute inset-0 bg-[linear-gradient(var(--bdr)_1px,transparent_1px),linear-gradient(90deg,var(--bdr)_1px,transparent_1px)] bg-[length:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black_20%,transparent_80%)] opacity-40 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,var(--teal-g)_0%,transparent_60%)] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-[700px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[var(--teal-g)] border border-[var(--teal-b)] text-[var(--teal)] text-[0.7rem] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-6"
          >
            📜 Legal
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--ink)] mb-3"
          >
            Terms of <span className="bg-gradient-to-br from-[var(--teal)] to-[var(--blue)] dark:from-[#34D399] dark:to-[var(--blue2)] text-transparent bg-clip-text">Service</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[0.82rem] font-medium text-[var(--teal)] mb-5 tracking-[0.05em]"
          >
            Last Updated: March 8, 2026
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[1rem] text-[var(--ink3)] max-w-[520px] mx-auto leading-[1.8] font-light"
          >
            By using our platform you agree to these Terms of Service. Please read them carefully before accessing or using Explyra.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-[5vw] py-16 bg-[var(--bg)]">
        <div className="max-w-[900px] mx-auto bg-[var(--surf)] dark:bg-[var(--bg3)] border border-[var(--bdr)] rounded-2xl shadow-[var(--s2)] overflow-hidden">
          <div className="p-8 md:p-14">
            
            <LegalSection num="1" title="Acceptance of Terms">
              <p>By accessing or using the Explyra platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform. These terms apply to all users, including administrators, employees, and visitors.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="2" title="Use of Platform">
              <p>You agree to use Explyra only for lawful purposes consistent with all applicable laws and regulations. The platform is intended for legitimate business expense management and related services.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="3" title="Account Responsibilities">
              <p>Users are responsible for maintaining the security of their account credentials. You agree to:</p>
              <ul className="list-none p-0 mt-2 mb-0 flex flex-col gap-2">
                <ListItem>Keep your login credentials confidential at all times</ListItem>
                <ListItem>Notify us immediately of any unauthorized access to your account</ListItem>
                <ListItem>Ensure all submitted information is accurate and truthful</ListItem>
                <ListItem>Accept responsibility for all activities under your account</ListItem>
              </ul>
            </LegalSection>

            <Divider />

            <LegalSection num="4" title="Subscription & Billing">
              <p>Some features require a paid subscription. By subscribing, you agree to pay the applicable fees as described on our <Link href="/pricing" className="text-[var(--teal)] font-semibold hover:underline">pricing page</Link>. Pricing may change with prior notice.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="5" title="Restrictions">
              <p>Users may not, under any circumstances:</p>
              <ul className="list-none p-0 mt-2 mb-0 flex flex-col gap-2">
                <ListItem>Reverse engineer, decompile, or disassemble any part of the platform</ListItem>
                <ListItem>Abuse or overload platform resources or infrastructure</ListItem>
                <ListItem>Use the service for any illegal or unauthorized purpose</ListItem>
                <ListItem>Attempt to gain unauthorized access to other accounts or systems</ListItem>
              </ul>
            </LegalSection>

            <Divider />

            <LegalSection num="6" title="Intellectual Property">
              <p>The Explyra platform, including all original content, features, design, and functionality, is and will remain the exclusive property of Explyra and its founders. Protected by copyright, trademark, and other applicable laws.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="7" title="Termination">
              <p>We may suspend or terminate accounts that violate our policies or engage in fraudulent activity. Upon termination, your right to access the Service will immediately cease. You may also terminate your account at any time by contacting support.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="8" title="Limitation of Liability">
              <p>In no event shall Explyra, its founders, employees, or affiliates, be liable for any indirect, incidental, special, or consequential damages, including loss of profits, data, or goodwill, resulting from your use of or inability to use the Service.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="9" title="Changes to Terms">
              <p>We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated date. Continued use of the platform after modifications constitutes acceptance of the revised terms.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="10" title="Contact Us">
              <p>If you have questions about these Terms, please reach out to us:</p>
              <div className="bg-[var(--bg3)] dark:bg-[var(--bg4)] border border-[var(--bdr)] rounded-[10px] p-6 mt-4">
                <p className="text-[0.88rem] text-[var(--ink3)] font-normal m-0">
                  Email: <a href="mailto:explyra@gmail.com" className="text-[var(--teal)] font-semibold hover:underline">explyra@gmail.com</a>
                </p>
                <p className="text-[0.88rem] text-[var(--ink3)] font-normal m-0 mt-2">
                  Address: New Delhi, India
                </p>
              </div>
            </LegalSection>

          </div>
        </div>
      </section>
    </div>
  );
}

function LegalSection({ num, title, children }: { num: string, title: string, children: React.ReactNode }) {
  return (
    <div className="mb-11 last:mb-0">
      <h2 className="font-playfair text-[1.25rem] font-bold text-[var(--ink)] mb-4 flex items-center gap-0">
        <span className="inline-flex items-center justify-center w-[28px] h-[28px] bg-[var(--teal-g)] border border-[var(--teal-b)] text-[var(--teal)] text-[0.72rem] font-bold rounded-md mr-2.5 flex-shrink-0 align-middle">
          {num}
        </span>
        {title}
      </h2>
      <div className="text-[0.92rem] text-[var(--ink3)] leading-[1.85] font-light space-y-3">
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--bdr)] my-10" />;
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-[0.9rem] text-[var(--ink3)] font-light pl-[1.4rem] relative leading-[1.75] before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-1.5 before:bg-[var(--teal)] before:rounded-full">
      {children}
    </li>
  );
}

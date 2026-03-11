"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="px-[5vw] pt-32 pb-16 text-center relative overflow-hidden bg-[var(--bg)]">
        <div className="absolute inset-0 bg-[linear-gradient(var(--bdr)_1px,transparent_1px),linear-gradient(90deg,var(--bdr)_1px,transparent_1px)] bg-[length:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black_20%,transparent_80%)] opacity-40 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,var(--blue-g)_0%,transparent_60%)] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-[700px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[var(--blue-g)] border border-[var(--blue-b)] text-[var(--blue)] text-[0.7rem] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-6"
          >
            🔒 Legal
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--ink)] mb-3"
          >
            Privacy <span className="bg-gradient-to-br from-[var(--blue)] to-[var(--purp)] dark:from-[var(--blue2)] dark:to-[var(--purp2)] text-transparent bg-clip-text">Policy</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[0.82rem] font-medium text-[var(--blue)] mb-5 tracking-[0.05em]"
          >
            Last Updated: March 8, 2026
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[1rem] text-[var(--ink3)] max-w-[520px] mx-auto leading-[1.8] font-light"
          >
            We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and protect your information.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-[5vw] py-16 bg-[var(--bg)]">
        <div className="max-w-[900px] mx-auto bg-[var(--surf)] dark:bg-[var(--bg3)] border border-[var(--bdr)] rounded-2xl shadow-[var(--s2)] overflow-hidden">
          <div className="p-8 md:p-14">
            
            <LegalSection num="1" title="Introduction">
              <p>We value your privacy. This Privacy Policy explains how Explyra collects, uses, and protects information when you use our platform. By using our services, you agree to the collection and use of information in accordance with this policy.</p>
              <p>If you have any questions about this policy, please contact us at the details provided at the end of this document.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="2" title="Information We Collect">
              <p>We may collect the following types of data when you use our platform:</p>
              <ul className="list-none p-0 mt-2 mb-0 flex flex-col gap-2">
                <ListItem>Name and display name</ListItem>
                <ListItem>Email address</ListItem>
                <ListItem>Company and organization information</ListItem>
                <ListItem>Usage data and interaction logs</ListItem>
                <ListItem>Device information (browser type, OS, IP address)</ListItem>
                <ListItem>Expense records and financial data submitted by you</ListItem>
              </ul>
            </LegalSection>

            <Divider />

            <LegalSection num="3" title="How We Use Your Data">
              <p>We use the collected information to:</p>
              <ul className="list-none p-0 mt-2 mb-0 flex flex-col gap-2">
                <ListItem>Provide and maintain the Explyra platform</ListItem>
                <ListItem>Improve and personalize our services</ListItem>
                <ListItem>Provide customer support and respond to queries</ListItem>
                <ListItem>Send important product updates and announcements</ListItem>
                <ListItem>Ensure security and prevent fraudulent activity</ListItem>
                <ListItem>Comply with legal obligations</ListItem>
              </ul>
            </LegalSection>

            <Divider />

            <LegalSection num="4" title="Data Sharing & Third Parties">
              <p>We do not sell, trade, or rent your personal data. We may share information with:</p>
              <ul className="list-none p-0 mt-2 mb-0 flex flex-col gap-2">
                <ListItem>Service providers (e.g., Firebase, Google Analytics) who assist in running our business.</ListItem>
                <ListItem>Professional advisors, such as lawyers and accountants.</ListItem>
                <ListItem>Law enforcement, if strictly required by applicable law.</ListItem>
              </ul>
            </LegalSection>

            <Divider />

            <LegalSection num="5" title="Data Security & Firebase">
              <p>Explyra utilizes Google Firebase for secure data storage. Firebase employs enterprise-grade infrastructure and security standards. While no electronic storage method is 100% secure, we use robust encryption, rigorous access controls, and strict HTTPS protocols to protect your personal and financial data.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="6" title="Children's Privacy">
              <p>Explyra is not intended for use by individuals under the age of 18. We do not knowingly collect personal data from children. If you become aware that a child has provided us with personal data, please contact us.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="7" title="Cookies">
              <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="8" title="Contact Us">
              <p>If you have any questions or requests regarding your data, please reach out to us:</p>
              <div className="bg-[var(--bg3)] dark:bg-[var(--bg4)] border border-[var(--bdr)] rounded-[10px] p-6 mt-4">
                <p className="text-[0.88rem] text-[var(--ink3)] font-normal m-0">
                  Email: <a href="mailto:explyra@gmail.com" className="text-[var(--blue)] font-semibold hover:underline">explyra@gmail.com</a>
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
        <span className="inline-flex items-center justify-center w-[28px] h-[28px] bg-[var(--blue-g)] border border-[var(--blue-b)] text-[var(--blue)] text-[0.72rem] font-bold rounded-md mr-2.5 flex-shrink-0 align-middle">
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
    <li className="text-[0.9rem] text-[var(--ink3)] font-light pl-[1.4rem] relative leading-[1.75] before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-1.5 before:bg-[var(--blue)] before:rounded-full">
      {children}
    </li>
  );
}

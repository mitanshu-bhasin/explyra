"use client";

import { motion } from "framer-motion";

export default function RefundPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="px-[5vw] pt-32 pb-16 text-center relative overflow-hidden bg-[var(--bg)]">
        <div className="absolute inset-0 bg-[linear-gradient(var(--bdr)_1px,transparent_1px),linear-gradient(90deg,var(--bdr)_1px,transparent_1px)] bg-[length:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black_20%,transparent_80%)] opacity-40 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,var(--amber)_0%,transparent_60%)] opacity-10 pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-[700px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[var(--amber)]/10 border border-[var(--amber)]/20 text-[var(--amber)] text-[0.7rem] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-6"
          >
            💳 Legal
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--ink)] mb-3"
          >
            Refund <span className="bg-gradient-to-br from-[var(--amber)] to-[#E97316] dark:from-[#FDE68A] dark:to-[#FB923C] text-transparent bg-clip-text">Policy</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[0.82rem] font-medium text-[var(--amber)] mb-5 tracking-[0.05em]"
          >
            Last Updated: March 8, 2026
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[1rem] text-[var(--ink3)] max-w-[520px] mx-auto leading-[1.8] font-light"
          >
            We want you to be satisfied with Explyra. This policy outlines our refund eligibility criteria and the process for requesting a refund.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-[5vw] py-16 bg-[var(--bg)]">
        <div className="max-w-[900px] mx-auto bg-[var(--surf)] dark:bg-[var(--bg3)] border border-[var(--bdr)] rounded-2xl shadow-[var(--s2)] overflow-hidden">
          <div className="p-8 md:p-14">
            
            <LegalSection num="1" title="Refund Eligibility">
              <p>Refund requests must be submitted within <strong>7 days of the original purchase date</strong>. Requests made after this period will not be eligible for a refund.</p>
              
              <div className="bg-[var(--amber)]/10 border border-[var(--amber)]/20 rounded-[10px] p-5 my-4">
                <p className="text-[0.9rem] text-[var(--ink2)] font-medium m-0">
                  ⏰ Refund window: 7 days from the date of subscription purchase.
                </p>
              </div>

              <p>To be eligible, you must not have violated our Terms of Service and the refund must be for a valid reason relating to platform functionality or billing errors.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="2" title="Free Trial">
              <p>We offer a free trial period so users can evaluate the Explyra platform before committing to a paid subscription. We strongly encourage all users to take advantage of the free trial before purchasing.</p>
              <p>Refunds will not be issued if a free trial was already used before the subscription purchase, as the platform's capabilities were available for evaluation.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="3" title="Subscription Refunds">
              <p>If you are eligible for a refund, the amount refunded will be the subscription price paid, minus any applicable processing fees. Refunds are issued to the original payment method within 5–10 business days.</p>
              <p>Only the most recent billing cycle is eligible for a refund. Previous billing period charges are non-refundable.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="4" title="Non-Refundable Cases">
              <p>Refunds are not provided in the following cases:</p>
              <ul className="list-none p-0 mt-2 mb-0 flex flex-col gap-2">
                <ListItem>Partial subscription usage — no pro-rated refunds for mid-cycle cancellations</ListItem>
                <ListItem>Violations of our Terms of Service or Acceptable Use Policy</ListItem>
                <ListItem>Enterprise contracts or custom pricing agreements</ListItem>
                <ListItem>Requests submitted after the 7-day refund window</ListItem>
                <ListItem>Refund requests made after a prior refund has already been processed</ListItem>
              </ul>
            </LegalSection>

            <Divider />

            <LegalSection num="5" title="How to Request a Refund">
              <p>To request a refund, please contact our support team with the following details:</p>
              <ul className="list-none p-0 mt-2 mb-0 flex flex-col gap-2">
                <ListItem>Your registered email address</ListItem>
                <ListItem>Date of subscription purchase</ListItem>
                <ListItem>Reason for refund request</ListItem>
                <ListItem>Any relevant screenshots or transaction IDs</ListItem>
              </ul>
              <p className="mt-4">We will review your request and respond within 2–3 business days.</p>
            </LegalSection>

            <Divider />

            <LegalSection num="6" title="Contact">
              <p>To request a refund or for any billing inquiries, please contact us directly:</p>
              <div className="bg-[var(--bg3)] dark:bg-[var(--bg4)] border border-[var(--bdr)] rounded-[10px] p-6 mt-4">
                <p className="text-[0.88rem] text-[var(--ink3)] font-normal m-0 leading-loose">
                  📧 Email: <a href="mailto:explyra@gmail.com" className="text-[var(--amber)] font-semibold hover:underline">explyra@gmail.com</a><br />
                  ⏱️ Response time: 2–3 business days<br />
                  🏢 Explyra · Founded by Mitanshu Bhasin
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
        <span className="inline-flex items-center justify-center w-[28px] h-[28px] bg-[var(--amber)]/10 border border-[var(--amber)]/20 text-[var(--amber)] text-[0.72rem] font-bold rounded-md mr-2.5 flex-shrink-0 align-middle">
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
    <li className="text-[0.9rem] text-[var(--ink3)] font-light pl-[1.4rem] relative leading-[1.75] before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-1.5 before:bg-[var(--amber)] before:rounded-full">
      {children}
    </li>
  );
}

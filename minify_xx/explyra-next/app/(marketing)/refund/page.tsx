import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Explyra Ecosystem",
  description: "Explyra's billing and refund policies.",
};

export default function RefundPage() {
  return (
    <div className="pt-32 pb-24 px-[5vw] min-h-screen bg-white dark:bg-[#080B14]">
      <div className="mkt-container max-w-[800px]">
        <div className="mb-12">
          <h1 className="hero-h my-4 text-4xl">Refund Policy</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          <h2>1. Overview</h2>
          <p>
            We want you to be completely satisfied with your purchase. If you are not satisfied, we offer a refund policy as outlined below.
          </p>

          <h2>2. Eligibility for Refunds</h2>
          <p>
            Customers are eligible for a full refund within 14 days of their initial purchase, provided that the software or service has not been substantially utilized. &quot;Substantially utilized&quot; is defined as exceeding 10% of the allocated monthly resources or data quotas.
          </p>

          <h2>3. Annual Subscriptions</h2>
          <p>
            For annual subscriptions, if you cancel within the first 30 days, you will receive a prorated refund for the remaining 11 months. After 30 days, annual subscriptions are non-refundable, but you will retain access until the end of your billing cycle.
          </p>

          <h2>4. How to Request a Refund</h2>
          <p>
            To request a refund, please contact our support team through the official contact form or by emailing support@explyra.me. Please include your transaction ID and the email associated with your account. We aim to process all requests within 3-5 business days.
          </p>

          <h2>5. Exceptions</h2>
          <p>
            Enterprise contracts with custom deployments, SLA agreements, or dedicated account management may supersede these standard terms. Please refer to your master service agreement.
          </p>
        </div>
      </div>
    </div>
  );
}

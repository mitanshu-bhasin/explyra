import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Explyra Ecosystem",
  description: "Explyra's terms of service and user agreement.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-[5vw] min-h-screen bg-white dark:bg-[#080B14]">
      <div className="mkt-container max-w-[800px]">
        <div className="mb-12">
          <h1 className="hero-h my-4 text-4xl">Terms of Service</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          <h2>1. Your relationship with Explyra</h2>
          <p>
            Your use of Explyra&apos;s products, software, services and web sites (referred to collectively as the &quot;Services&quot; in this document and excluding any services provided to you by Explyra under a separate written agreement) is subject to the terms of a legal agreement between you and Explyra.
          </p>

          <h2>2. Accepting the Terms</h2>
          <p>
            In order to use the Services, you must first agree to the Terms. You may not use the Services if you do not accept the Terms.
          </p>

          <h2>3. Provision of the Services by Explyra</h2>
          <p>
            Explyra is constantly innovating in order to provide the best possible experience for its users. You acknowledge and agree that the form and nature of the Services which Explyra provides may change from time to time without prior notice to you.
          </p>

          <h2>4. Use of the Services by you</h2>
          <p>
            In order to access certain Services, you may be required to provide information about yourself (such as identification or contact details) as part of the registration process for the Service, or as part of your continued use of the Services. You agree that any registration information you give to Explyra will always be accurate, correct and up to date.
          </p>

          <h2>5. Passwords and account security</h2>
          <p>
            You agree and understand that you are responsible for maintaining the confidentiality of passwords associated with any account you use to access the Services.
          </p>
        </div>
      </div>
    </div>
  );
}

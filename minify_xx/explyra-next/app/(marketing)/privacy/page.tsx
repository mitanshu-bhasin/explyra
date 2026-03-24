import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Explyra Ecosystem",
  description: "Explyra's privacy policy and data handling guidelines.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-[5vw] min-h-screen bg-white dark:bg-[#080B14]">
      <div className="mkt-container max-w-[800px]">
        <div className="mb-12">
          <h1 className="hero-h my-4 text-4xl">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          <h2>1. Information We Collect</h2>
          <p>
            At Explyra, we collect information to provide better services to our users. We collect information in the following ways:
            <ul>
              <li><strong>Information you give us.</strong> For example, our services require you to sign up for an Explyra Account. When you do, we&apos;ll ask for personal information, like your name, email address, telephone number or credit card to store with your account.</li>
              <li><strong>Information we get from your use of our services.</strong> We collect information about the services that you use and how you use them, like when you visit a website that uses our advertising services, or you view and interact with our ads and content.</li>
            </ul>
          </p>

          <h2>2. How We Use Information We Collect</h2>
          <p>
            We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect Explyra and our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads.
          </p>

          <h2>3. Transparency and Choice</h2>
          <p>
            People have different privacy concerns. Our goal is to be clear about what information we collect, so that you can make meaningful choices about how it is used.
          </p>

          <h2>4. Information We Share</h2>
          <p>
            We do not share personal information with companies, organizations and individuals outside of Explyra unless one of the following circumstances applies:
            <ul>
              <li>With your consent.</li>
              <li>For legal reasons.</li>
            </ul>
          </p>

          <h2>5. Information Security</h2>
          <p>
            We work hard to protect Explyra and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold.
          </p>
        </div>
      </div>
    </div>
  );
}

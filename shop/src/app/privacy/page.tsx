import Header from "@/components/Header";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink font-sans">
      <Header />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20 space-y-8">
        <h1 className="text-4xl font-serif font-bold">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-brand-ink-light space-y-4">
          <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Explyra Shop.</p>
          <h2 className="text-xl font-bold text-brand-ink">Personal Information We Collect</h2>
          <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
        </div>
      </main>
    </div>
  );
}

import Header from "@/components/Header";

export default function TOC() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink font-sans">
      <Header />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20 space-y-8">
        <h1 className="text-4xl font-serif font-bold">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-brand-ink-light space-y-4">
          <p>By using our website, you agree to these terms.</p>
          <h2 className="text-xl font-bold text-brand-ink">Usage</h2>
          <p>This site is provided for the purchase of architectural materials. All prices are inclusive of GST unless stated otherwise.</p>
        </div>
      </main>
    </div>
  );
}

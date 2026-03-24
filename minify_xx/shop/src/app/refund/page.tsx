import Header from "@/components/Header";

export default function Refund() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink font-sans">
      <Header />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20 space-y-8">
        <h1 className="text-4xl font-serif font-bold">Refund Policy</h1>
        <div className="prose prose-slate max-w-none text-brand-ink-light space-y-4">
          <p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.</p>
          <h2 className="text-xl font-bold text-brand-ink">Glass and Custom Orders</h2>
          <p>Please note that custom-cut glass and aluminium profiles are non-refundable once production has started.</p>
        </div>
      </main>
    </div>
  );
}

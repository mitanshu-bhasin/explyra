import type { Metadata } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Explyra Shop | Krishna Glass House',
  description: 'Premium glass types, aluminium work, PVC hardware, and services by Explyra Shop.',
  openGraph: {
    title: 'Explyra Shop',
    description: 'B2B Glass & Hardware Solutions',
    url: 'https://explyra.me/shop',
    siteName: 'Explyra',
    images: [{ url: '/assets/images/explyra_logo.png' }],
    locale: 'en_US',
    type: 'website',
  },
};

import { Providers } from '@/components/Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen bg-brand-bg text-brand-ink font-sans selection:bg-brand-blue/20">
        <Providers>
          {children}
          
          <footer className="border-t border-brand-bdr py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-brand-ink">Explyra Shop</h2>
                  <p className="text-xs font-bold text-brand-ink-light uppercase tracking-widest max-w-xs leading-relaxed">
                    Premium materials for architectural excellence. Part of Krishna Glass House Rohtak.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-xs font-bold uppercase tracking-[0.2em] text-brand-ink-light">
                  <div className="space-y-4">
                    <h4 className="text-brand-ink">Company</h4>
                    <div className="flex flex-col gap-3">
                      <Link href="/privacy" className="hover:text-brand-blue transition-colors font-medium">Privacy Policy</Link>
                      <Link href="/refund" className="hover:text-brand-blue transition-colors font-medium">Refund Policy</Link>
                      <Link href="/toc" className="hover:text-brand-blue transition-colors font-medium">Terms of Service</Link>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-brand-ink">Manage</h4>
                    <div className="flex flex-col gap-3">
                      <Link href="/admin" className="hover:text-brand-blue transition-colors font-medium">Admin Dashboard</Link>
                      <Link href="/auth" className="hover:text-brand-blue transition-colors font-medium">Login / Sign Up</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-brand-bg flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink-light/50">
                <p>&copy; {new Date().getFullYear()} Explyra Shop & Krishna Glass House.</p>
                <p>Designed for High-Performance Architecture</p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

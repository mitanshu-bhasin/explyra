import type { Metadata } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Explyra Booking | Professional Scheduling Made Simple',
  description: 'The high-performance scheduling engine for the Explyra ecosystem. Effortless booking for modern teams and enterprises. Founded by Mitanshu Bhasin.',
  metadataBase: new URL('https://explyra.me'),
  openGraph: {
    title: 'Explyra Booking',
    description: 'Professional scheduling for the modern edge.',
    url: 'https://explyra.me/booking',
    siteName: 'Explyra Suite',
    images: [{ url: '/booking_hero.png' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explyra Booking',
    description: 'Effortless scheduling for modern teams.',
    images: ['/booking_hero.png'],
  },
};

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
        </Providers>
      </body>
    </html>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explyra Booking | Professional Scheduling Made Simple",
  description: "The high-performance scheduling engine for the Explyra ecosystem. Effortless booking for modern teams and enterprises. Founded by Mitanshu Bhasin.",
  openGraph: {
    title: "Explyra Booking",
    description: "Professional scheduling for the modern edge.",
    url: "https://explyra.me/booking",
    siteName: "Explyra Suite",
    images: [{ url: "/booking_hero.png" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explyra Booking",
    description: "Effortless scheduling for modern teams.",
    images: ["/booking_hero.png"],
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

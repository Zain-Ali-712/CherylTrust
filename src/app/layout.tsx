import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Cheryl McDonough | Trust Technique Practitioner NZ | Pet Behaviorist",
  description:
    "Certified Trust Technique Practitioner & Pet Behaviorist in Wellington, NZ. Specializing in dog & horse behaviour — anxiety, aggression, trauma & more. Book an appointment today.",
  keywords: [
    "Trust Technique",
    "Pet Behaviorist",
    "Dog Behaviorist",
    "Horse Behaviorist",
    "Wellington NZ",
    "Dog Training",
    "Animal Therapy",
    "Cheryl McDonough",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-montserrat, 'Montserrat', 'Inter', sans-serif)" }}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

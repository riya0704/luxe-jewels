import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Providers } from "./providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxe-jewels.vercel.app";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LUXE — Fine Jewellery",
    template: "%s | LUXE Fine Jewellery",
  },
  description:
    "Discover handcrafted luxury jewellery — rings, necklaces, bracelets, earrings, and limited-edition collections. Timeless elegance, modern artistry.",
  keywords: ["luxury jewellery", "fine jewellery", "gold rings", "diamond necklaces", "handcrafted"],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LUXE Fine Jewellery",
    title: "LUXE — Fine Jewellery",
    description:
      "Discover handcrafted luxury jewellery — rings, necklaces, bracelets, earrings, and limited-edition collections.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE — Fine Jewellery",
    description:
      "Discover handcrafted luxury jewellery — rings, necklaces, bracelets, earrings, and limited-edition collections.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} dark`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="bg-obsidian text-ivory antialiased">
        <Providers>
          <LoadingScreen />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

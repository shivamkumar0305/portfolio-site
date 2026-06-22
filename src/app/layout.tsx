import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shivamkumar.dev"),
  title: {
    default: "Shivam Kumar | Backend Engineer",
    template: "%s | Shivam Kumar"
  },
  description: "Backend-focused software engineer building scalable web applications using Django, PostgreSQL, Next.js, and modern cloud tools.",
  keywords: ["Backend Engineer", "Software Engineer Portfolio", "Django", "PostgreSQL", "Next.js", "Systems Design"],
  authors: [{ name: "Shivam Kumar" }],
  creator: "Shivam Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shivamkumar.dev",
    siteName: "Shivam Kumar Portfolio",
    title: "Shivam Kumar | Backend Engineer",
    description: "High-performance backend systems, clean APIs, and databases. Review my projects and execution.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shivam Kumar | Backend Engineer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Kumar | Backend Engineer",
    description: "Backend-focused software engineer building scalable web applications.",
    images: ["/assets/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0c0a09] text-[#F5F5F4]">
        <JsonLd />
        <Navbar />
        <main className="flex-grow">{children}</main>
        
        {/* Footer */}
        <footer className="border-t border-[#262524] bg-[#0c0a09] py-12 text-center text-xs text-stone-500">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono">&copy; {new Date().getFullYear()} SHIVAM KUMAR. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6 font-mono">
              <a href="https://github.com/shivamkumar0305" target="_blank" rel="noopener noreferrer" className="hover:text-stone-300 transition-colors">
                GITHUB
              </a>
              <a href="https://www.linkedin.com/in/shivam10305/" target="_blank" rel="noopener noreferrer" className="hover:text-stone-300 transition-colors">
                LINKEDIN
              </a>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

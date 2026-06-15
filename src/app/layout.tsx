import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/components/providers/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FutureousAI | Premium AI Career Guidance for Indian Students",
  description: "Scientifically analyze your aptitude, personality, and interests. Get a 7-page Premium Career Report and AI Counseling tailored for Class 10, 11, and 12 students in India.",
  keywords: ["career guidance", "AI counselor", "psychometric test", "aptitude test", "student career roadmap", "Indian students", "CBSE career guidance", "ICSE career guidance"],
  authors: [{ name: "FutureousAI Team" }],
  creator: "FutureousAI",
  publisher: "FutureousAI",
  openGraph: {
    title: "FutureousAI | Premium AI Career Guidance",
    description: "Discover your true potential with the most advanced psychometric and AI engine built specifically for Indian students.",
    url: "https://futureousai.com",
    siteName: "FutureousAI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FutureousAI | Premium AI Career Guidance",
    description: "Discover your true potential with the most advanced psychometric and AI engine built specifically for Indian students.",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

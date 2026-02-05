import FirstVisitGate from "@/components/FirstVisitGate";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/SideBar";
import { ThemeProvider } from "@/context/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Canyon Bryson | AI Engineer + Full-Stack Developer",
  description:
    "AI Engineer and Full-Stack Developer shipping production AI systems. 7 years experience, 6 projects shipped in the last year.",
  openGraph: {
    title: "Canyon Bryson | AI Engineer + Full-Stack Developer",
    description:
      "I write reuseable, pattern-based code that is easy to understand and maintain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-inter antialiased`}>
        <ThemeProvider>
          <FirstVisitGate />
          <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Navigation */}
            <MobileNav />

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              <div className="mx-auto w-full max-w-6xl px-6 py-12 pt-20 lg:px-10 lg:py-16 lg:pt-16">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

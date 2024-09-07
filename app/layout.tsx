import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import { ThemeProvider } from "@/context/ThemeProvider";
import type { Metadata } from "next";
// eslint-disable-next-line
import { Inter, Space_Grotesk } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Portfolio | Canyon Bryson",
  description: "Portfolio for Canyon Bryson",
  // icons: {icon: "/favicon.ico", type: "image/x-icon"},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${spaceGrotesk.className} background-light850_dark100`}
      >
        <ThemeProvider>
          <>
            <Navbar />
            <div className="flex">
              <Sidebar />
              <section className="flex min-h-screen flex-1 flex-col px-6 pb-40 pt-36 max-md:pb-14 sm:px-14">
                <div className="mx-auto w-full max-w-5xl">{children}</div>
              </section>
            </div>
            <Footer />
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}

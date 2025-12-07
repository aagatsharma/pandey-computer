import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pandey Computer - Best Computer & Gaming Store in Pokhara",
  description:
    "Pandey Computer is Pokhara's premier destination for gaming laptops, PC accessories, custom builds, and computer hardware. Best prices and expert service in Pokhara, Nepal.",
  keywords: [
    "computer store pokhara",
    "gaming laptop pokhara",
    "pc accessories pokhara",
    "computer shop pokhara",
    "gaming accessories pokhara",
    "custom pc build pokhara",
    "computer hardware pokhara",
    "pandey computer pokhara",
    "best computer store pokhara",
    "gaming hub pokhara",
    "laptop repair pokhara",
    "computer parts pokhara",
    "gaming peripherals pokhara",
    "pc components pokhara",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

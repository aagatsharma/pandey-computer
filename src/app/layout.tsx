import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import Providers from "@/components/providers";
import { defaultOgImage, getSiteUrlObject } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: {
    default: "Pandey Computer - Best Computer & IT Store in Pokhara",
    template: "%s | Pandey Computer",
  },
  applicationName: "Pandey Computer",
  description:
    "Pandey Computer is your trusted partner for the latest computer products and technology solutions. Best prices and expert service in Pokhara, Nepal.",
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
  authors: [{ name: "Pandey Computer" }],
  creator: "Pandey Computer",
  publisher: "Pandey Computer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Pandey Computer - Best Computer & IT Store in Pokhara",
    description:
      "Pandey Computer is your trusted partner for the latest computer products and technology solutions.",
    siteName: "Pandey Computer",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pandey Computer - Best Computer & IT Store in Pokhara",
    description:
      "Pandey Computer is your trusted partner for the latest computer products and technology solutions.",
    images: [defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

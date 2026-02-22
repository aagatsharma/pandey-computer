import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "sonner";
import NextProgress from "@/components/top-loader";

const univiaPro = localFont({
  src: [
    {
      path: "../../public/fonts/UniviaPro-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/UniviaPro-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/UniviaPro-UltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/UniviaPro-UltraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/UniviaPro-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/UniviaPro-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/UniviaPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/UniviaPro-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/UniviaPro-Book.otf",
      weight: "450",
      style: "normal",
    },
    {
      path: "../../public/fonts/UniviaPro-BookItalic.otf",
      weight: "450",
      style: "italic",
    },
    {
      path: "../../public/fonts/UniviaPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/UniviaPro-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/UniviaPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/UniviaPro-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/UniviaPro-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/UniviaPro-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../public/fonts/UniviaPro-Ultra.otf",
      weight: "950",
      style: "normal",
    },
    {
      path: "../../public/fonts/UniviaPro-UltraItalic.otf",
      weight: "950",
      style: "italic",
    },
  ],
  variable: "--font-univia-pro",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    default: "Pandey Computer - Best Computer & Gaming Store in Pokhara",
    template: "%s | Pandey Computer",
  },
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
    title: "Pandey Computer - Best Computer & Gaming Store in Pokhara",
    description:
      "Pandey Computer is Pokhara's premier destination for gaming laptops, PC accessories, custom builds, and computer hardware.",
    siteName: "Pandey Computer",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pandey Computer - Gaming and PC Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pandey Computer - Best Computer & Gaming Store in Pokhara",
    description:
      "Pandey Computer is Pokhara's premier destination for gaming laptops, PC accessories, custom builds, and computer hardware.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${univiaPro.variable} font-sans antialiased`}>
        <NextProgress />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}

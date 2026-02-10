import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Toaster } from "sonner";
import NextProgress from "@/components/top-loader";

const univiaPro = localFont({
  src: [
    {
      path: "../../public/fonts/fonnts.com-univiapro-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-thinit.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-ultralightit.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-lightit.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-regularit.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-book.otf",
      weight: "450",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-bookit.otf",
      weight: "450",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-mediumit.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-boldit.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-blackit.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-ultra.otf",
      weight: "950",
      style: "normal",
    },
    {
      path: "../../public/fonts/fonnts.com-univiapro-ultrait.otf",
      weight: "950",
      style: "italic",
    },
  ],
  variable: "--font-univia-pro",
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
      <body className={`${univiaPro.variable} font-sans antialiased`}>
        <NextProgress />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}

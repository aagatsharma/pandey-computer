import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsappFloater from "@/components/whatsapp-floater";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <WhatsappFloater />
      <Footer />
    </>
  );
};

export default RootLayout;

import type { Metadata } from "next";
import "../globals.css";
import Header from "@/src/components/header/header";
import Footer from "@/src/components/footer/footer";

export const metadata: Metadata = {
  title: "Homie",
  description: "Homie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

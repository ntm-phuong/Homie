import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <head />
      <body>
        <div className="min-h-screen flex flex-col">
          <div className="bg-white shadow-sm">Header</div>
          <div className="flex-1 bg-gray-100 p-10">{children}</div>
          <div className="bg-white shadow-sm">Footer</div>
        </div>
      </body>
    </html>
  );
}

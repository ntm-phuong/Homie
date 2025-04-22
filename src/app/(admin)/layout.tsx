"use client";

import Footer from "@/src/components/footer/footer";
import AdminHeader from "@/src/components/header/AdminHeader";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <div className="flex-1 bg-[#ffe3e8] p-10">{children}</div>
      <Footer />
    </div>
  );
}

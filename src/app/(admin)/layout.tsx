"use client";

import Footer from "@/src/components/footer/footer";
import AdminHeader from "@/src/components/header/AdminHeader";
import AdminSidebar from "@/src/components/sidebar/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminHeader />
      <div className="min-h-screen flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-[#ffe3e8] p-10">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

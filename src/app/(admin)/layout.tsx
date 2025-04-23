"use client";

import { useState } from "react";
import Footer from "@/src/components/footer/footer";
import AdminHeader from "@/src/components/header/AdminHeader";
import AdminSidebar from "@/src/components/sidebar/AdminSidebar";
import { MenuOutlined } from "@ant-design/icons";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 hover:bg-gray-100"
        >
          <MenuOutlined className="text-xl" />
        </button>
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Sidebar - hidden on mobile by default */}
        <div
          className={`
          fixed inset-0 z-10 transform lg:relative lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
        `}
        >
          <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col mt-12 lg:mt-0">
          <div className="flex-1 bg-[#ffe3e8] p-4 pt-20 lg:p-10">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

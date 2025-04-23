"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeOutlined, UserOutlined, ShopOutlined } from "@ant-design/icons";

const menuItems = [
  { name: "Home", href: "/", icon: HomeOutlined },
  { name: "Users", href: "/admin/manage-user", icon: UserOutlined },
  { name: "Rooms", href: "/admin/manage-list-roóm", icon: ShopOutlined },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? " bg-rose-500 text-white"
                      : "text-gray-700 hover:bg-main/10"
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="pl-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

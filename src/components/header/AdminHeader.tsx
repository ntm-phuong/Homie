"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const MENU_LIST = [
  {
    href: "/admin/manage-user",
    label: "Users",
  },
  {
    href: "/admin/manage-room",
    label: "Rooms",
  },
];

const AdminHeader = () => {
  const pathname = usePathname();

  const _renderLogo = () => (
    <Link href="/" className="flex items-center no-underline">
      <div className="text-rose-500 font-bold text-2xl flex items-center">
        <span className="font-serif italic">Homie.</span>
      </div>
    </Link>
  );

  const _renderNavigator = () => (
    <div className="hidden md:flex gap-2">
      {MENU_LIST.map((menuItem) => (
        <Link
          key={menuItem.label}
          href={menuItem.href}
          className={`font px-2 ${
            pathname === menuItem.href && "text-rose-500 font-semibold"
          }`}
        >
          {menuItem.label}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="flex justify-between items-center w-full py-3 px-10">
      {_renderLogo()} {_renderNavigator()}
    </div>
  );
};

export default AdminHeader;

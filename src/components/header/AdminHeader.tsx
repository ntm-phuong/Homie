"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Dropdown, MenuProps } from "antd";
import { IMAGE_URL } from "@/public";
import Image from "next/image";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const userItems: MenuProps = {
  items: [
    {
      key: "1",
      label: <span className="font-semibold w-full block">Logout</span>,
      onClick: handleLogout,
    },
  ],
};

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
    <Dropdown menu={userItems} placement="bottomRight" trigger={["click"]}>
      <button className="rounded-full border border-gray-300 flex gap-2 items-center px-4 py-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <Image src={IMAGE_URL.MENU} alt="Menu" width={16} height={16} />
      </button>
    </Dropdown>
  );

  return (
    <div className="flex justify-between items-center w-full py-3 px-10">
      {_renderLogo()} {_renderNavigator()}
    </div>
  );
};

export default AdminHeader;

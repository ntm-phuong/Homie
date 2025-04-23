"use client";

import Link from "next/link";
import React from "react";
import { Dropdown, MenuProps } from "antd";
import { IMAGE_URL } from "@/public";
import Image from "next/image";
import { MenuOutlined } from "@ant-design/icons";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

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

const AdminHeader = ({ onToggleSidebar }: AdminHeaderProps) => {
  const _renderLogo = () => (
    <Link href="#" className="flex items-center no-underline">
      <div className="text-rose-500 font-bold text-2xl flex items-center">
        <span className="font-serif italic">Homie.</span>
      </div>
    </Link>
  );

  const _renderToggleSidebarButton = () => (
    <div className="lg:hidden ">
      <button
        onClick={() => onToggleSidebar()}
        className="p-4 hover:bg-gray-100"
      >
        <MenuOutlined className="text-xl" />
      </button>
    </div>
  );

  const _renderNavigator = () => (
    <Dropdown
      menu={userItems}
      placement="bottomRight"
      trigger={["click"]}
      className="lg:block hidden"
    >
      <button className="rounded-full border border-gray-300 flex gap-2 items-center px-4 py-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <Image src={IMAGE_URL.MENU} alt="Menu" width={16} height={16} />
      </button>
    </Dropdown>
  );

  return (
    <div className="flex justify-between items-center w-full py-3 px-10">
      {_renderLogo()}
      {_renderToggleSidebarButton()}
      {_renderNavigator()}
    </div>
  );
};

export default AdminHeader;

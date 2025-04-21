"use client";

import { Compass, Layout } from "lucide-react";
import SideBarItem from "./sidebar-item";

export default function SideBarRoutes() {
  const guestRoutes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: Compass,
      label: "Settings",
      href: "/search",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {guestRoutes.map((route) => (
        <SideBarItem
          key={route.label}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}

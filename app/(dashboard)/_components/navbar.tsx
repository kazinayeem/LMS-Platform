import React from "react";
import MobileSidebar from "./mobileSidebar";
import NavbarRoutes from "@/components/navbar-routes";

export default function Navbar() {
  return (
    <div className="p-4 border-b w-full flex items-center bg-white">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
}

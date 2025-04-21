"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SideBarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export default function SideBarItem({ href, icon, label }: SideBarItemProps) {
  const pathName = usePathname();
  const router = useRouter();

  const isActive = pathName === href || pathName.startsWith(href + "/");
  const handleClick = () => {
    router.push(href);
  };

  const IconComponent = icon;

  return (
    <div className="relative w-full">
      {/* Left active indicator */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 bg-sky-700 rounded-r-full transition-opacity",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />
      <button
        onClick={handleClick}
        type="button"
        className={cn(
          "flex items-center gap-x-2 text-slate-500 text-sm font-[500] hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-slate-200 rounded-md px-3 py-2 w-full pl-5",
          isActive &&
            "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-200"
        )}
      >
        <IconComponent
          className={cn(
            "text-slate-500 dark:text-slate-200 transition-colors duration-200 ease-in-out"
          )}
        />
        {label}
      </button>
    </div>
  );
}

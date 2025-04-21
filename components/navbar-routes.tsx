"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function NavbarRoutes() {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/player");
  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-sm"
        >
          <LogOut
            className="mr-2 h-4 w-4"
            size={16}
            color="currentColor"
            aria-hidden="true"
          />
          Exit
        </Button>
      ) : (
        <Link href="/teacher/courses" className="text-sm">
          <Button variant="ghost">Teacher Mode</Button>
        </Link>
      )}
      <UserButton />
    </div>
  );
}

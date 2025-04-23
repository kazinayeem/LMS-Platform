import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="p-6 gap-2 flex flex-row items-center">
      <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link>
      <Link href="/teacher/category">
        <Button>New Category</Button>
      </Link>
    </div>
  );
}

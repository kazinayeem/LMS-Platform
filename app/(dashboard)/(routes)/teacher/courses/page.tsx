import { LoadingSkeleton } from "@/components/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import CourseListTable from "./_components/course-list-table";

export default function Page() {
  return (
    <div className="p-6 space-y-6">
      <div className="p-6 gap-2 flex flex-row items-center">
        <Link href="/teacher/create">
          <Button>New Course</Button>
        </Link>
        <Link href="/teacher/category">
          <Button>New Category</Button>
        </Link>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <CourseListTable />
      </Suspense>
    </div>
  );
}

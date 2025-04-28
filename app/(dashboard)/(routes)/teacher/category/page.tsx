import { LoadingSkeleton } from "@/components/loading";
import { Suspense } from "react";
import CategoryList from "./_components/category-list";

export default async function Page() {
  return (
    <div className="flex flex-wrap gap-4 p-10">
      {/* <div className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5rem)] flex flex-col justify-between">
        <Suspense fallback={<LoadingSkeleton />}>
          <CategoryForm />
        </Suspense>
      </div> */}
      <Suspense fallback={<LoadingSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
}

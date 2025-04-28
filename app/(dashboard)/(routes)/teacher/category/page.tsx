// page.tsx
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/loading";
import CategoryList from "./_components/category-list";
import CategoryForm from "./_components/CategoryForm";

export default function Page() {
  return (
    <div className="flex flex-wrap gap-4 p-10 flex-col md:flex-row">
      <div className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5rem)] flex flex-col justify-between">
        <CategoryForm />
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
}

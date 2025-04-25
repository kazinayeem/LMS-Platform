import prisma from "@/lib/db";
import CategoryForm from "./_components/CategoryForm";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/loading";


export default async function page() {
  const categories = await prisma.category.findMany();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Suspense fallback={<LoadingSkeleton />}>
        <CategoryForm initialCategories={categories} />
      </Suspense>
    </div>
  );
}

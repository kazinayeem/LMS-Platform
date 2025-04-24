import prisma from "@/lib/db";
import CategoryForm from "./_components/CategoryForm";

export const dynamic = "force-dynamic";

export default async function Page() {
  const categories = await prisma.category.findMany();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <CategoryForm initialCategories={categories} />
    </div>
  );
}

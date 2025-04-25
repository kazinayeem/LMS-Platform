import prisma from "@/lib/db";
import CategoryForm from "./_components/CategoryForm";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/loading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function page() {
  const categories = await prisma.category.findMany();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Suspense fallback={<LoadingSkeleton />}>
        <CategoryForm />
      </Suspense>
      <h2 className="text-2xl font-bold">Categories</h2>
      <div className="space-y-4 flex flex-row gap-4 flex-wrap ">
        {categories?.map((cat) => (
          <Card key={cat.id} className="w-1/4 flex flex-col justify-between">
            <CardContent className="p-4 space-y-1">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <div className="flex gap-2 mt-2">
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

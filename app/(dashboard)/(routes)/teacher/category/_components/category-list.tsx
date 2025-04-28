// _components/category-list.tsx
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";

export default async function CategoryList() {
  const categories = await prisma.category.findMany();

  return (
    <>
      {categories?.map((cat) => (
        <Card
          key={cat.id}
          className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5rem)] flex flex-col justify-between"
        >
          <CardContent className="p-4 space-y-3">
            <h3 className="text-lg font-semibold break-words">{cat.name}</h3>
            <div className="flex gap-2">
              <EditButton id={cat.id} name={cat.name} />
              <DeleteButton id={cat.id} />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

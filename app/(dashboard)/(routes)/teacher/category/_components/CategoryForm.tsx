"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryForm({
  initialCategories,
}: {
  initialCategories: { id: string; name: string }[];
}) {
  const categories = initialCategories;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const url = editingId ? `/api/category/${editingId}` : `/api/category`;

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setLoading(false);
    setName("");
    setEditingId(null);
    router.refresh();
  };

  const handleEdit = (cat: { id: string; name: string }) => {
    setName(cat.name);
    setEditingId(cat.id);
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await fetch(`/api/category/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold">
          {editingId ? "Edit" : "Add"} Category
        </h2>
        <div className="space-y-2">
          <Label>Category Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <Button type="submit">
          {loading ? "Loading..." : editingId ? "Update" : "Add"}
        </Button>
      </form>
      <h2 className="text-2xl font-bold">Categories</h2>
      <div className="space-y-4 flex flex-row gap-4 flex-wrap ">
        {categories?.map((cat) => (
          <Card key={cat.id} className="w-1/4 flex flex-col justify-between">
            <CardContent className="p-4 space-y-1">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(cat)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(cat.id)}
                >
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

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function EditButton({ id, name }: { id: string; name: string }) {
  const [loading, setLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [catname, setcatName] = React.useState("");

  useEffect(() => {
    setcatName(name);
  }, [name]);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const router = useRouter();

  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `/api/category/${id}`,
        { name: catname },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 200) {
        setLoading(false);
        toast.success("Category updated successfully!");
        router.refresh();
        setIsEditing(false);
      } else {
        setLoading(false);

        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Button variant="outline" size="sm" onClick={toggleEdit}>
        {isEditing ? <Pencil /> : null}
        {isEditing ? "Cancel" : "Edit"}
      </Button>
      {isEditing && (
        <div className="space-y-2">
          <Input
            type="text"
            value={catname}
            onChange={(e) => setcatName(e.target.value)}
            required
            className="w-full max-w-md"
          />
          <Button
            type="submit"
            onClick={handleEdit}
            className="w-full max-w-md"
          >
            {loading ? "Loading..." : "Update"}
          </Button>
        </div>
      )}
    </div>
  );
}

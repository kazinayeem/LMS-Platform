"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import React from "react";
import toast from "react-hot-toast";

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const res = await axios.delete(`/api/category/${id}`, { data: { id } });
      if (res.status === 200) {
        setLoading(false);
        toast.success("Category deleted successfully!");
        router.refresh();
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
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? "Loading..." : "Delete"}
    </Button>
  );
}

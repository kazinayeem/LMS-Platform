"use client";
import React from "react";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
interface PriceFormProps {
  initialData: {
    price: number;
  };
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number().min(1, {
    message: "Price is required",
  }),
});
export default function PriceForm({ courseId, initialData }: PriceFormProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch("/api/courses/" + courseId, data);
      if (response.status === 201) {
        toast.success("Course updated successfully!");
        router.refresh();
        setIsEditing(false);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <span>Course Price</span>
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <span className="text-red-500">Cancel</span>
          ) : (
            <>
              <Pencil />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p>{initialData.price}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-x-2 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Course Price"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

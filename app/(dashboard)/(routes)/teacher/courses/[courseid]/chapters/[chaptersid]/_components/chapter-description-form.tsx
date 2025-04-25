"use client";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface DescriptionFormProps {
  initialData: {
    description: string;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export default function DescriptionForm({
  courseId,
  initialData,
  chapterId,
}: DescriptionFormProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const quillRef = useRef<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const router = useRouter();
  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (isEditing && editorRef.current && !quillRef.current) {
      // Initialize Quill when editing starts
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
        placeholder: "Write your course description here...",
      });
      quill.root.innerHTML = form.getValues("description") || "";
      quill.on("text-change", () => {
        form.setValue("description", quill.root.innerHTML);
      });
      quillRef.current = quill;
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, [isEditing, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        data
      );
      if (response.status === 200 || response.status === 201) {
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
        <span>Course description</span>
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <span className="text-red-500">Cancel</span>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: initialData.description }}
        />
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <div ref={editorRef} className="bg-white rounded-md" />
            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

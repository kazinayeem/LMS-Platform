"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});
export default function CreatePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  return (
    <div className="max-w-5xl  mx-auto md:flex flex-col md:items-center md:justify-center h-full p-6">
      <h1 className="text-2xl">Name your Course</h1>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Whats the name of your course? This will be used to identify it in the
        dashboard and in the app. You can change it later if you want.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Course Title"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will be used to identify your course in the dashboard and
                  in the app. You can change it later if you want.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Link href={"/"}>
              <Button variant={"ghost"}>Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

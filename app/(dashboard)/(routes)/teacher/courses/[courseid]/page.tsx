import { IconBadge } from "@/components/icon-badge";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import PriceForm from "./_components/price-form";
import CourseImageForm from "./_components/image-form";

export default async function Page({
  params,
}: {
  params: Promise<{ courseid: string }>;
}) {
  const { courseid } = await params;
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const course = await prisma.course.findUnique({
    where: {
      id: courseid,
    },
  });
  if (!course) {
    return redirect("/teacher/courses");
  }

  const requireFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.price,
  ];

  const totalFields = requireFields.length;
  const completedFields = requireFields.filter(Boolean).length;
  const completionText = `${completedFields} of ${totalFields} fields completed`;
  const completionPercentage = Math.round(
    (completedFields / totalFields) * 100
  );
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold">Course SetUp</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {completionText}
          </p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge size={"sm"} icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm
            courseId={courseid}
            initialData={{
              title: course.title as string,
            }}
          />
          <DescriptionForm
            courseId={courseid}
            initialData={{
              description: course.description as string,
            }}
          />
          <CourseImageForm
            courseId={courseid}
            initialData={{
              imageUrl: course.imageUrl as string,
            }}
          />
          <PriceForm
            courseId={courseid}
            initialData={{
              price: course.price as number,
            }}
          />
        </div>
      </div>
    </div>
  );
}

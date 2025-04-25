import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import DescriptionForm from "./_components/chapter-description-form";
import TitleForm from "./_components/chapter-titile-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";

const ChapterIdPage = async ({
  params,
}: {
  params: Promise<{ courseid: string; chaptersid: string }>;
}) => {
  const { userId } = await auth();
  const { courseid, chaptersid } = await params;
  if (!userId) {
    return redirect("/");
  }

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: chaptersid,
      courseId: courseid,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${courseid}`}
            className="flex items-center text-sm hover:opacity-75 hover:text-blue-500 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Chapter Creation</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 mt-6  p-4">
        {" "}
        <TitleForm
          chapterId={chaptersid}
          courseId={courseid}
          initialData={{ title: chapter.title ?? "" }}
        />
        <DescriptionForm
          chapterId={chaptersid}
          courseId={courseid}
          initialData={{ description: chapter.description ?? "" }}
        />
        <ChapterAccessForm
          chapterId={chaptersid}
          courseId={courseid}
          initialData={chapter}
        />
      </div>
    </div>
  );
};

export default ChapterIdPage;

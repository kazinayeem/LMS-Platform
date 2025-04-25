import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import DescriptionForm from "./_components/chapter-description-form";
import TitleForm from "./_components/chapter-titile-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";

const ChapterIdPage = async ({
  params,
}: {
  params: Promise<{ courseid: string; chaptersid: string }>;
}) => {
  const { userId } = await auth();
  const { courseid, chaptersid } = await params;

  if (!userId) return redirect("/");

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: chaptersid,
      courseId: courseid,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) return redirect("/");

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link
          href={`/teacher/courses/${courseid}`}
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to course setup
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Chapter Setup</h1>
        <p className="text-sm text-gray-600 mt-1">
          Complete all fields{" "}
          <span className="font-medium">{completionText}</span>
        </p>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border">
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
        <ChapterVideoForm
          chapterId={chaptersid}
          courseId={courseid}
          initialData={chapter}
        />
      </div>
    </div>
  );
};

export default ChapterIdPage;

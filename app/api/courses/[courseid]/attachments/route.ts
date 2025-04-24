import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseid: string }> }
) {
  const { courseid } = await params;

  try {
    const { userId } = await auth();
    const { url } = await req.json();
    console.log("[log]", url, userId);

    if (!url) {
      return new NextResponse("URL is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: courseid,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await prisma.attachment.create({
      data: {
        url: url,
        name: url.split("/").pop(),
        courseId: courseid,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[COURSE_ID_ATTACHMENTS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

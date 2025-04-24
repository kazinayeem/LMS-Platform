import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseid: string; attachmentId: string }> }
) {
  const { courseid, attachmentId } = await params;
  try {
    const { userId } = await auth();

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

    const attachment = await prisma.attachment.delete({
      where: {
        courseId: courseid,
        id: attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[ATTACHMENT_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

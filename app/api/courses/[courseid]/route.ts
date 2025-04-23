import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseid: string }> }
) {
  const { courseid } = await params;

  try {
    const { userId } = await auth();
    const body = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!courseid) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.update({
      where: { id: courseid, userId: userId },
      data: { ...body },
    });

    return NextResponse.json(
      { message: "Course updated successfully", course: course },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Error updating course:]", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

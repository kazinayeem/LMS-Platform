import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();
    console.log("[COURSE_POST]", userId, title);
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        title: title,
        userId: userId,
      },
    });
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.log("[COURSE_POST]", error);
    return new NextResponse("Failed to create course", { status: 500 });
  }
}

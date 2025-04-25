import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import prisma from "@/lib/db";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseid: string; chapterid: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { chapterid, courseid } = await params;
    const values = await req.json();

    // Check if course belongs to the logged-in user
    const courseOwner = await prisma.course.findUnique({
      where: {
        id: courseid,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Update chapter info
    const chapter = await prisma.chapter.update({
      where: {
        id: chapterid,
        courseId: courseid,
      },
      data: {
        ...values,
      },
    });

    // If videoUrl is provided, handle Mux video logic
    if (values.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: {
          chapterId: chapter.id,
        },
      });

      // Delete old video if exists
      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await prisma.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      // Upload new video to Mux
      const asset = await mux.video.assets.create({
        inputs: [{ url: values.videoUrl }],
        playback_policy: ["public"],
        test: false,
      });

      // Save muxData to DB
      await prisma.muxData.create({
        data: {
          chapterId: chapter.id,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id || "",
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

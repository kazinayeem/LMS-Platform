import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const handelAuth = async () => {
  const { userId } = await auth();
  if (!userId)
    throw new UploadThingError(
      "Unauthorized: You must be logged in to upload files."
    );
  return { userId };
};

const f = createUploadthing();

export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => handelAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["image", "video", "audio", "pdf"])
    .middleware(() => handelAuth())
    .onUploadComplete(() => {}),
  courseVideo: f({ video: { maxFileSize: "1GB", maxFileCount: 1 } })
    .middleware(() => handelAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

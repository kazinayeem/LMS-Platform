"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";
import toast from "react-hot-toast";
interface FileUploadProps {
  onChange: (url?: string) => void;
  endPoint: keyof typeof ourFileRouter;
}

export default function FileUplaod({ onChange, endPoint }: FileUploadProps) {
  return (
    <main className="flex  flex-col items-center justify-between p-2">
      <UploadButton
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          onChange(res[0]?.url);
          toast.success("Upload Completed! 🎉");
        }}
        onUploadError={(error: Error) => {
          toast.error(`Error: ${error.message}`);
        }}
      />
    </main>
  );
}

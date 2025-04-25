import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function CourseListTable() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const course = await prisma.course.findMany({
    where: {
      userId: userId,
    },
    include: {
      Category: true,
    },
  });
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">IsPublished</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {course.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.id}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.Category?.name}</TableCell>
              <TableCell className="text-right">{course.price}</TableCell>
              <TableCell className="text-right">
                {course.isPublished ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("Updating category...");
  console.log("Request body:", req.body);

  const { name } = await req.json();
  console.log("Parsed name:", name);
  try {
    const updated = await prisma.category.update({
      where: { id: (await params).id },
      data: { name },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await prisma.category.delete({ where: { id: (await params).id } });
  return NextResponse.json({ success: true });
}

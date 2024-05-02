import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, url, courseId } = body;

    // check if attachment already exists
    const existingAttachment = await prisma.attachment.findFirst({
      where: { name: name },
    });

    if (existingAttachment) {
      return NextResponse.json(
        { attachment: null, message: "Attachment with this name already exists" },
        { status: 409 }
      );
    }

    const newAttachment = await prisma.attachment.create({
      data: {
        name,
        url,
        courseId
      },
    });

    return NextResponse.json(
      { attachment: newAttachment, message: "Attachment created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

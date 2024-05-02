import prisma from "@/libs/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth.config";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { title, description, imageUrl, price, categoryId, oldPrice, vote, bestSeller } =
      body;
      
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        imageUrl,
        price: parseFloat(price),
        userId: session.user.id,
        categoryId,
        oldPrice: parseFloat(oldPrice),
        vote,
        bestSeller
      },
    });

    return NextResponse.json(
      { course: newCourse, message: "Course created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  console.log("GET API", session.user.id);
  return NextResponse.json({ authenticated: !!session });
}

import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    // check if category already exists
    const existingCategory = await db.category.findUnique({
      where: { name: name },
    });
    if (existingCategory) {
      return NextResponse.json(
        { category: null, message: "Category with this name already exists" },
        { status: 409 }
      );
    }

    const newCategory = await db.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(
      { category: newCategory, message: "Category created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}

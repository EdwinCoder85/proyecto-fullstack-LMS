import prisma from "@/libs/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params: { id } }: Params) {
  try {
    const { name, description } =
      await request.json();

    const updateCategory = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(updateCategory);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Categoría no encontrado"},
          { status: 404}
        )
      }

      return NextResponse.json(
        { message: "No se pudo actualizar el categoría"},
        { status: 500}
      )
    }
  }
}
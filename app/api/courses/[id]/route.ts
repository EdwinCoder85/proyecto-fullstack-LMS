import prisma from "@/libs/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function DELETE(request: Request, { params: { id } }: Params) {
  try {
    await prisma.course.delete({
      where: {
        id: id,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Producto no encontrado" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "No se pudo eliminar el producto" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params: { id } }: Params) {
  try {
    const { title, description, imageUrl, price, categoryId } =
      await request.json();

    const updateCourse = await prisma.course.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        imageUrl,
        price,
        categoryId,
      },
    });

    return NextResponse.json(updateCourse);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Curso no encontrado"},
          { status: 404}
        )
      }

      return NextResponse.json(
        { message: "No se pudo actualizar el curso"},
        { status: 500}
      )
    }
  }
}

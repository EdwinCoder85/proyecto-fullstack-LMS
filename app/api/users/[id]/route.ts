import prisma from "@/libs/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params: { id }  }: Params) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params: { id } }: Params) {
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    // if (!deletedUser) {
    //   return NextResponse.json(
    //     { message: "Usuario no encontrado" },
    //     { status: 404 }
    //   );
    // }

    // return NextResponse.json(deletedUser);
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Usuario no encontrado" },
          { status: 404 }
        );
      }
      // return NextResponse.json({ message: error.message }, { status: 500 });
      return NextResponse.json(
        { error: "No se pudo eliminar el producto" },
        { status: 500 }
      );
    }
  }
}

export async function PUT(request: Request, { params: { id } }: Params) {
  try {
    const { username, email, password, role } = await request.json();

    const hashedPassword = await bcrypt.hash( password, 10 );

    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username,
        email,
        password: hashedPassword,
        role
      },
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Usuario no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "No se pudo actualizar el usuario" },
        { status: 500 }
      );
    }
  }
}

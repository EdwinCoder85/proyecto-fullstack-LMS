import prisma from "@/libs/db";
import { messages } from "@/utils/messages";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface RequestBody {
  newPassword: string;
  confirmPassword: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    const { newPassword, confirmPassword } = body;


    // validamos que esten todos los campos
    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: messages.error.needProps },
        { status: 400 }
      );
    }
    
    const headersInstance = headers()
    const authHeader = headersInstance.get('authorization')

    let token

    if (authHeader) {
      token = authHeader.split(' ')[1];
    }

    // verificar que haya token
    if (!token) {
      return NextResponse.json(
        { message: messages.error.notAuthorized },
        { status: 400 }
      );
    }

    try {
      const isTokenValid = jwt.verify(token, "secreto");
   

      //@ts-ignore
      const { data } = isTokenValid;

      const userFind = await prisma.user.findFirst({
        where: { id: data.userId },
      });

      // validar que exista el usuario
      if (!userFind) {
        return NextResponse.json(
          { user: null, message: messages.error.userNotFound },
          { status: 409 }
        );
      }

      // validamos que la nueva contraseña sea igual a la confirmacion
      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: messages.error.passwordNotMatch },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash( newPassword, 10 );

      userFind.password = hashedPassword;

      if (userFind) {
        await prisma.user.update({
          where: { id: userFind.id },
          data: { password: hashedPassword, emailVerified: true },
        });

        return NextResponse.json(
          { message: messages.sucess.passwordChanged },
          { status: 200 }
        );
      }
    } catch (error) {

      return NextResponse.json(
        {message: messages.error.tokenNotValid, error},
        { status: 400}
      )
    }
  } catch (error) {
    return NextResponse.json(
      {message: messages.error.default, error},
      { status: 400}
    )
  }
}

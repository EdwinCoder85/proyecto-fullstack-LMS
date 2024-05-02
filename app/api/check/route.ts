import { messages } from "@/utils/messages";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/libs/db";

export async function GET() {
  try {
    const headerList = headers();
    const token = headerList.get("token");

    //valida que haya token
    if (!token) {
      return NextResponse.json(
        { message: messages.error.notAuthorized },
        { status: 400 }
      );
    }

    try {
      const isTokenValid = jwt.verify(token, "secreto");
      // @ts-ignore
      const { data } = isTokenValid;

      const userFind = await prisma.user.findFirst({
        where: { id: data.userId },
      });

      // verificamos que exista el usuario
      if (!userFind) {
        return NextResponse.json(
          { message: messages.error.userNotFound },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { isAuthorized: true, message: messages.sucess.authorized },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: messages.error.tokenNotValid, error },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 400 }
    );
  }
}

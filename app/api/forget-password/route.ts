import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { messages } from "@/utils/messages";

const resend = new Resend("re_g7jcjrFt_Zhn3YnKgZoDzEnpEa5AM4Yxw");

interface RequestBody {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    const { email } = body;

    const userFind = await prisma.user.findUnique({
      where: { email: email },
    });

    // validar que exista el usuario
    if (!userFind) {
      return NextResponse.json(
        { user: null, message: messages.error.userNotFound},
        { status: 409 }
      );
    }

    const tokenData = {
      email: userFind.email,
      userId: userFind.id,
    };

    const token = jwt.sign({ data: tokenData }, "secreto", {
      expiresIn: "86400",
    });

    const forgetUrl = `http://localhost:3000/auth/change-password?token=${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      // to: "edwinagemiler17@gmail.com",
      subject: "Cambio de contraseña",
      html: `<a href=${forgetUrl}>Cambiar contraseña</a>`,
    });

    return NextResponse.json(
      { message: messages.sucess.emailSent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}

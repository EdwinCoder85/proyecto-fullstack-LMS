import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { messages } from "@/utils/messages";
import jwt from "jsonwebtoken";

interface RequestBody {
  email: string;
  username: string;
  password: string;
  role: string;
  image: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { email, username, password, role, image } = body;

    // check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: messages.error.emailExist },
        { status: 409 }
      );
    }
    // check if username already exists
    const existingUserByUsername = await prisma.user.findFirst({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json({
        user: null,
        message: "User with this username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
        image,
      },
    });
    // const { password: newUserPassword, ...rest } = newUser;
    const { password: _, ...user } = newUser;
    const token = jwt.sign({ data: user }, "secreto", {
      expiresIn: 86400,
    });

    const response = NextResponse.json(
      { newUser: user, message: messages.sucess.userCreated },
      { status: 201 }
    );

    response.cookies.set("auth_cookie", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: messages.error.default, error },
        { status: 500 }
      );
    }
  }
}

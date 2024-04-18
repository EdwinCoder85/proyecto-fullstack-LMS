import prisma from "@/libs/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { verifyJwt } from "@/libs/jwt";

interface RequestBody {
  email: string;
  username: string;
  password: string;
}

export async function POST( request: Request ) {
  try {
    const body: RequestBody = await request.json();
    const { email, username, password } = body;

    // check if email already exists
    const existingUserByEmail = await prisma.user.findUnique( {
      where: { email: email },
    } );
    
    if ( existingUserByEmail ) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }
    // check if username already exists
    const existingUserByUsername = await prisma.user.findUnique( {
      where: { username: username },
    } );
    if ( existingUserByUsername ) {
      return NextResponse.json( {
        user: null,
        message: "User with this username already exists",
      } );
    }

    const hashedPassword = await bcrypt.hash( password, 10 );
    const newUser = await prisma.user.create( {
      data: {
        username,
        email,
        password: hashedPassword,
      },
    } );
    // const { password: newUserPassword, ...rest } = newUser;
    const { password: _, ...user } = newUser;

    return NextResponse.json(
      { user: user, message: "User created successfully" },
      { status: 201 }
    );
  } catch ( error ) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request ) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json( users );
  } catch ( error ) {
    if ( error instanceof Error ) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}


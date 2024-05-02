import { signJwtAccessToken } from "@/libs/jwt";
import prisma from "@/libs/db";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {

  try {
    const body: RequestBody = await request.json();
  
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    
    if (user) {
      const passwordMatches = await bcrypt.compare(body.password, user.password || '');
      if (passwordMatches) {
        const { password, ...userWithoutPass } = user;
        const token = signJwtAccessToken(userWithoutPass);
        const result = {
          ...userWithoutPass,
          token,
        };
        return NextResponse.json( {
          id: result.id,
          name: result.username,
          email: result.email,
          accessToken: result.token
        } );
      }
    }
    
    // Handle incorrect password or user not found
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }

}

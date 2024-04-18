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
    
    if (user && (await bcrypt.compare(body.password, user.password))) {
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
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 505 }
    );
  }

}
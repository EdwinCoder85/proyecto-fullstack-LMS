import prisma from "@/libs/db";
import { NextResponse } from "next/server";
import myUser from "@/actions/getCurrentUser";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { verifyJwt } from "@/libs/jwt";
// import { GetServerSessionOptions } from "next-auth/internals";

export async function POST(req: Request) {

  try {
    const accessToken = req.headers.get("Authorization");
    console.log(accessToken)
   // Obtener la sesión del usuario
   const session = await getServerSession(authOptions);

   // Verificar si el usuario está autenticado
   console.log("Session:", session); // Agrega este registro para verificar la sesión

   if (!session) {
     console.log("User not authenticated"); // Agrega este registro para verificar si el usuario no está autenticado
     return NextResponse.json(
       { message: "User not authenticated" },
       { status: 401 }
     );
   }

    const body = await req.json();

  const { title, description, imageUrl, price, isPublished, categoryId } = body;
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        imageUrl,
        price,
        isPublished,
        categoryId,
        userId: parseInt(session.user.id),
      },
    });

    return NextResponse.json(
      { course: newCourse, message: "Course created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

// export async function GET(request: Request) {
//   const session = await getServerSession(authOptions);
//   console.log(session?.user.id);

//   if (!session) {
//     return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
//       status: 401,
//     });
//   }

//   console.log("GET API", session.user.id);
//   return NextResponse.json({ authenticated: !!session });
// }



export async function GET(request: Request) {
  const accessToken = request.headers.get("Authorization");

  if (accessToken && verifyJwt(accessToken)) return new Response(" Ok You Have Logged In!");

  return new Response("unauthorized", { status: 401 });
  // return NextResponse.json(
  //   { message: "User not authenticated" },
  //   { status: 401 }
  // );
}

import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";
import { z } from "zod";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          ...token,
          token: "sssasdasdfasdasd",
        } as any;
      }

      // Determinar el rol del usuario basado en la información de la base de datos
      if (session.user && session.user.id) {
        const userFromDatabase = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { role: true }, // Seleccionar solo el campo de rol
        });

        // Verificar si se encontró el usuario en la base de datos y asignar su rol
        if (userFromDatabase) {
          session.user.role = userFromDatabase.role;
        } else {
          // Si no se encontró el usuario en la base de datos, asignar un rol predeterminado o manejar el caso según sea necesario
          session.user.role = "user"; // Por ejemplo, podrías asignar un rol predeterminado
        }
      }

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // BUSCAR CORREO
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) throw new Error("No user found");

        // COMPARAR LAS CONTRASEÑAS
        if (!bcrypt.compareSync(password, user.password as string)) {
          throw new Error("wrong password");
        }

        const { password: _, ...resto } = user;
        return resto;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);

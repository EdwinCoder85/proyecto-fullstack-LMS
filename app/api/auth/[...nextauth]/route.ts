import NextAuth,{ type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {

  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        // if (!credentials) {
        //   return null;
        // }

        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: credentials.email,
        //   },
        // });

        // if (!user) throw new Error("No user found");

        // console.log(user);

        // const matchPassword = await bcrypt.compare(
        //   credentials.password,
        //   user.password
        // );

        // if (!matchPassword) throw new Error("Wrong password");

        // return {
        //   id: user.id.toString(),
        //   name: user.username,
        //   email: user.email
        // };

        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
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
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     console.log('JWT Callback', { token, user })
  //     return { ...token, ...user };
  //   },
  //   async session({ session, token }) {
  //     console.log('Session Callback', {session, token})
  //     session.user = token as any;
  //     return session;
  //   },
  // },
  callbacks: {
    jwt: ({ token, user}) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id
        }
      }
      return token
    },
    session: ({session, token}) => {
      console.log('Session Callback', {session, token})
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id
        }
      }
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


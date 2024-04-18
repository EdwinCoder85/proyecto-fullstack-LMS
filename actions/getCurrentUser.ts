"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { db } from '../libs/db';

export default async function myUser() {
    try {

        const session = await getServerSession(authOptions);
        console.log("Session:", session);

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await db.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            throw new Error("User not found in the database");
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
        };
    } catch (error) {
        console.error("Error:", error); // Log error for debugging
        throw new Error("Error retrieving user information");
    }
}

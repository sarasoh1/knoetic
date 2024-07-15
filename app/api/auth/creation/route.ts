import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { generateUsername } from "unique-username-generator";

export async function GET() {
    // check user in database
    // if user exists, return user
    // else return new user and return user to homepage
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user || user === null || (!user.id))
        throw new Error("something went wrong please try again");

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });

    if(!dbUser) {
        dbUser = await prisma.user.create({
            data: {
               id: user.id,
               email: user.email?? "",
               firstName: user.given_name ?? "",
               lastName: user.family_name ?? "",
               userName: generateUsername("-", 3, 15),
            }
        })
    }

    return NextResponse.redirect("http://localhost:3000/")
}
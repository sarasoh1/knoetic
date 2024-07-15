import { redirect } from "next/navigation";
import { SettingsForm } from "@/app/components/settings-form";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getUserName(userId: string) {
    const username = await prisma.user.findUnique({
        where : {
            id: userId
        },
        select: {
            userName: true
        }
    });
    return username;
}

export default async function SettingsPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // check if there's a user
    if (!user) {
        return redirect("/api/auth/login");
    }
    const username = await getUserName(user.id);

    return (
        <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
            <SettingsForm username={username?.userName}/>
        </div>
    )
}
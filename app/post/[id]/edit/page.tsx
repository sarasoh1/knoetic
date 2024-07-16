"use client";

import prisma from "@/app/lib/db";
import { PostForm } from "@/app/components/post-form";

async function getPost(id: string){
    const data = await prisma.post.findUnique({
        where: {
            id: id
        },
        select: {
            title: true,
            createdAt: true,
            textContent: true,
            id: true,
            forumName: true,
            forum: {
                select: {
                    createdAt: true,
                    description: true
                }
            },
        }
    });
    return data;
}
export default async function EditPost({params}: {params: {id: string}}) {
    const post = await getPost(params.id);

    return (
        <div className="w-[1000px] rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex">
            <PostForm id={params.id} title={post?.title} textContent={post?.textContent}/>
        </div>
    )
}
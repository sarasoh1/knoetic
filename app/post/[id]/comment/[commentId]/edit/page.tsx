"use client";
import { CommentForm } from "@/app/components/comment-form";
import prisma from "@/app/lib/db";

async function getComment(commentId: string){
    const data = await prisma.comment.findUnique({
        where: {
            id: commentId
        },
        select: {
            id: true,
            text: true,
            postId: true
        }
    });
    return data;
}

export default async function EditComment({params}: {params: {commentId: string}}) {
    const comment = await getComment(params.commentId);
    return (
        <CommentForm postId={comment?.postId as string} commentId={params.commentId} />
    )    
}

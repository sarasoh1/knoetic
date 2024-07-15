"use client";

import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./submit-button";
import { createComment, updateComment } from "../actions";
import { useFormState } from "react-dom";
import prisma from "../lib/db";

// interface iAppProps {
//     postId: string;
// }

interface iUpdateCommentProps {
    commentId: string | null | undefined;
    postId: string;
}

const initialState = {
    message: "",
    status: "",
}
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

export async function CommentForm({postId, commentId}: iUpdateCommentProps) {
    const [state, commentAction] = useFormState(updateComment, initialState);

    if (commentId) {
        const comment = await getComment(commentId);
        return (
            <form action={commentAction}>
            <input type="hidden" name="commentId" value={commentId} />
            <input type="hidden" name="postId" value={postId} />
            <Textarea 
                className="w-full mt-1 mb-2" 
                placeholder="Edit your comment"
                defaultValue={comment?.text ?? undefined}
                name="comment"
            />
            <SubmitButton buttonName="Update Comment" />
        </form>
        )
    } else {
        return (
            <form className="mt-3" action={createComment}>
                <input type="hidden" name="postId" value={postId}/>
                <Textarea 
                    className="w-full mt-1 mb-2" 
                    placeholder="What do you think??" 
                    name="comment"
                />    
                <SubmitButton buttonName="Comment" />
            </form>
        )
    }
}
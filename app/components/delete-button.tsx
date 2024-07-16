"use client";

import { DeleteIcon } from "lucide-react";
import { deleteComment, deletePost } from "../actions";

export function DeletePostButton({postId}:{postId: string}) {
    return (
        <>
            <form action={deletePost}>
                <input type="hidden" name="postId" value={postId} />
                <button className="text-sm text-red-500" type="submit">Delete</button>
            </form>
        </>
    )

}

export function DeleteCommentButton({commentId, postId}:{commentId: string, postId: string}) {
    return (
        <>
            <form action={deleteComment}>
                <input type="hidden" name="postId" value={postId} />
                <input type="hidden" name="commentId" value={commentId} />
                <button className="text-sm text-red-500" type="submit">Delete</button>
            </form>
        </>
    )

}
"use client";

import { DeleteIcon } from "lucide-react";
import { deleteComment, deletePost } from "../actions";

export function DeletePostButton({postId}:{postId: string}) {
    return (
        <div className="flex items-center gap-x-2 p-2">
            <form action={deletePost}>
                <input type="hidden" name="postId" value={postId} />
                <DeleteIcon className="w-4 h-4" />
                <button className="text-xs text-red-500" type="submit">Delete</button>
            </form>
        </div>
    )

}

export function DeleteCommentButton({commentId, postId}:{commentId: string, postId: string}) {
    return (
        <div className="flex flex-col items-center gap-x-2 p-2">
            <form action={deleteComment}>
                <input type="hidden" name="postId" value={postId} />
                <input type="hidden" name="commentId" value={commentId} />
                <DeleteIcon className="w-4 h-4" />
                <button className="text-xs text-red-500" type="submit">Delete</button>
            </form>
        </div>
    )

}
"use client";

import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { updatePost } from "../actions";

interface iAppProps {
    id: string;
    title: string | null | undefined;
    textContent: string | null | undefined;
}

const initialState = {
    message: "",
    status: "",
}

export function PostForm({textContent, title, id}: iAppProps) {
    const [state, postAction] = useFormState(updatePost, initialState);

    return (
        <div className="w-[1000px] flex flex-col gap-y-5">
            <h1 className="text-lg font-bold mt-2 gap-y-2">Edit Post: <span color="red">{title}</span></h1>
            <form className="w-full mt-3" action={postAction}>
            <input type="hidden" name="title" value={title ?? undefined} />
            <input type="hidden" name="postId" value={id} />
            <Textarea 
                placeholder="Write a post :)"
                maxLength={100} 
                name="textContent"
                defaultValue={textContent ?? undefined}
            />
            <div className="mt-2">
            <SubmitButton buttonName="Edit Post" />
            </div>
            
            </form>
        </div>
    )
}
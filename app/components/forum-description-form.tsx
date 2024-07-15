"use client";

import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { updateForumDescription } from "../actions";
import { SaveButton } from "./submit-button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface iAppProps {
    forumName: string;
    description: string | null | undefined;
}
const initialState = {
    message: "",
    status: "",
}

export function ForumDescriptionForm({description, forumName}: iAppProps) {
    const [state, formAction] = useFormState(updateForumDescription, initialState);
    const {toast} = useToast();
    
    useEffect(() => {
        if (state.status === "success") {
            toast({
                title: "Success",
                description: state.message, 
            });
        } else if (state.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive"
            });
        }
    }, [state, toast]);

    return (
        <form className="mt-3" action={formAction}>
            <input type="hidden" name="forumName" value={forumName} />
            <Textarea 
            placeholder="Add description for your forum"
            maxLength={100} 
            name="description"
            defaultValue={description ?? undefined}
            />
            <SaveButton />
        </form>
    )
}
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./submit-button";
import { createComment } from "../actions";

interface iAppProps {
    postId: string;
}
export function CommentForm({postId}: iAppProps) {
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
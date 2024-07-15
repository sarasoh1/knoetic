import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import { likePost } from "../actions";

interface iAppProps {
    title: string;
    textContent: string;
    key: string;
    id: string;
    forumName: string;
    userName: string;
    numLikes: number;
    numComments: number;
}

export function PostCard({
    title,
    textContent,
    key,
    id,
    forumName,
    userName,
    numLikes,
    numComments
}: iAppProps) {
    return (
        <Card key={key} className="flex relative overflow-hidden">
            <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
                <form action={likePost}>
                    <input type="hidden" name="postId" value={id} />
                    <input type="hidden" name="liked" value="true" />
                    <Button variant="outline" size="sm" type="submit">
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </form>
                {numLikes}
            </div>

            <div>
                <div className="flex items-center gap-x-2 p-2">
                    <Link className="font-semibold text-xs" href={`/forum/${forumName}`}>
                        forum/{forumName}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                        Posted by <span className="hover:text-primary">{userName}</span>
                    </p>
                </div>

                <div className="px-2">
                    <Link href={`/post/${id}`}>
                        <h1 className="font-medium">{title}</h1>
                    </Link>
                </div>

                <div className="px-2 mt-2">
                    <p>{textContent}</p>
                </div>

                <div className="m-3">
                    <div className="flex items-center gap-x-1">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <Link href={`/post/${id}`} className="text-muted-foreground font-medium text-xs">{numComments} comments</Link>
                    </div>
                </div>
            </div>
        </Card>
    )
}
"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { likePost } from "../actions";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function LikeButton({ id }: { id: string }) {
    const { user } = useKindeBrowserClient();
    const router = useRouter();
    
    const handleLike = (postId: string) => 
        async (e: any) => {
            console.log("like: ", postId);
            if (!user) {
                router.push("/api/auth/login");
            } else {
                likePost(postId, user.id);
            } 
        };
    
    return (
        <>
        <Button variant="outline" size="sm" onClick={handleLike(id)}>
        <ArrowUp className="h-5 w-5" />
        </Button>
        </>
    )

}

import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { likePost } from "@/app/actions";
import { ArrowUp, MessageCircle } from "lucide-react";
import Link from 'next/link';
import { CommentForm } from "@/app/components/comment-form";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getPost(id : string) {
    const data = await prisma.post.findUnique({
        where: {
            id: id
        },
        select: {
            title: true,
            createdAt: true,
            textContent: true,
            id:true,
            forumName: true,
            forum : {
                select: {
                    createdAt: true,
                    description: true
                }
            },
            author: {
                select : {
                    id: true,
                    userName: true
                }
            },
            likes: true,
            comments: {
                select : {
                    id: true,
                    text: true,
                    author: true,
                    createdAt: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });
    if (!data) {
        return notFound();
    }
    return data;
}


export default async function PostPage(
    {params} : {params : {id: string}}
) {
    const post = await getPost(params.id);
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return (
        <div className="max-w-[1200px] mx-auto flex gap-x-10 mt-4 mb-10 justify-center">
            <div className="w-[100%] flex flex-col gap-y-5">
                <Card className="p-2 flex">
                    <div className="flex flex-col items-center gap-y-2 mt-2">
                        <form className="w-[100%]" action={likePost}>
                            <input type="hidden" name="postId" value={params.id} />
                            <input type="hidden" name="liked" value="true" />
                            <Button variant="outline" size="sm" type="submit">
                                <ArrowUp className="h-5 w-5" />
                            </Button>
                        </form>
                        {post.likes.length}
                    </div>

                <div className="p-2 w-full">
                    <div className="flex items-center gap-x-2 p-2">
                        <Link className="font-semibold text-xs" href={`/forum/${post.forumName}`}>
                            forum/{post.forumName}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                            Posted by <span className="hover:text-primary">{post.author?.userName}</span>
                        </p>

                        {user?.id === post.author?.id ? (
                            <Link className="text-xs text-muted-foreground" href={`/post/${params.id}/edit`}>Edit</Link>
                        ): (
                            <span></span>
                        )}
                        
                    </div>

                    <div className="px-2">
                        <Link href="/">
                            <h1 className="font-medium text-lg">{post.title}</h1>
                        </Link>
                    </div>

                    <div className="px-2 mt-2">
                        <p>{post.textContent}</p>
                    </div>

                    <div className="flex gap-x-1 items-center mt-5">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{post.comments.length} Comments</p>
                    </div>

                    <CommentForm postId={params.id} comment={null} commentId={null}/>
                    <Separator className = "my-3"/>

                    <div className="flex flex-col gap-y-4">
                        {post.comments.map((comment) => (
                            <div key={comment.id}>
                                <div className="flex items-center text-sm">
                                    <h3 className="text-sm font-medium">{comment.author?.userName}</h3>
                                    <span className="text-muted-foreground text-sm ml-1">{comment.createdAt.toDateString()}</span>
                                    {user?.id === comment.author?.id ? (
                                        <Link href={`/post/${params.id}/comment/${comment.id}/edit`} className="text-xs text-muted-foreground ml-3">Edit</Link>
                                        ) : (<span></span>)
                                    }
                                    
                                </div>
                                <p className="text-secondary-foreground text-sm">{comment.text}</p>
                            </div>
                            
                            ))
                        }
                    </div>
                </div>
                </Card>
            </div>
        </div>
    )
}
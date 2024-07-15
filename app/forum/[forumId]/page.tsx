import { Card } from "@/components/ui/card";
import prisma from "@/app/lib/db";
import Link from "next/link";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Textarea } from "@/components/ui/textarea";
import { SaveButton, SubmitButton } from "@/app/components/submit-button";
import { updateForumDescription } from "@/app/actions";
import { ForumDescriptionForm } from "@/app/components/forum-description-form";
import { PostCard } from "@/app/components/post-card";

async function getForum(name : string){
    const posts = await prisma.forum.findUnique({
        where : {
            name: name
        },
        select: {
            name: true,
            createdAt: true,
            description: true,
            createdByUserId: true,
            posts: {
                select: {
                    id: true,
                    title: true,
                    textContent: true,
                    likes: true,
                    author: {
                        select: {
                            userName: true
                        }
                    },
                    comments:true
                }
            }
        }
    });
    return posts;
}


export default async function ForumRoute({params}: {params: {forumId: string}}) {
    const forum = await getForum(params.forumId);
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return (
        <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
            <div className="w-[65%] flex flex-col gap-y-5">
                {forum?.posts.map((post) =>(
                    <PostCard
                        title={post.title}
                        id={post.id}
                        key={post.id}
                        forumName={forum.name}
                        userName={post.author?.userName as string}
                        textContent={post.textContent ?? ""}
                        numLikes={post.likes.length}
                        numComments={post.comments.length}
                    />
                ))}
            </div>

            <div className="w-[35%] flex flex-col gap-y-5">
                <Card>
                    <div className="bg-muted p-4 font-semibold">Forum</div>
                    <div className="p-4">
                        <div className="flex items-center gap-x-3">
                            <Image src={`https://avatar.vercel.sh/${forum?.name}`} 
                            alt="forum image" 
                            width={60}
                            height={60}
                            className="rounded-full h-16 w-16"
                            />
                            <Link href={`/forum/${forum?.name}`} className="font-medium">{forum?.name}</Link>
                        </div>

                        {user?.id === forum?.createdByUserId ? (
                            <ForumDescriptionForm description={forum?.description} forumName={params?.forumId}/>
                        ): (
                            <p className="text-sm font-normal text-secondary-foreground mt-2">
                            {forum?.description}
                            </p>
                        )}
                        
                    </div>
                </Card>
            </div>
        </div>
    );
}
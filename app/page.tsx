import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "./lib/db";
import { PostCard } from "./components/post-card";

async function getData() {
  const data = await prisma.post.findMany({
    select: {
      title: true,
      createdAt: true,
      textContent: true,
      id:true,
      author: {
        select: {
          userName: true
        }
      },
      forumName: true,
      likes: true,
      comments: true,
    },
    orderBy:{
      createdAt: "desc"
    }
  });
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        {data.map((post)=> (
          <PostCard 
          title={post.title} 
          id={post.id} 
          textContent={post.textContent ?? ""}
          forumName={post.forumName as string}
          userName={post.author?.userName as string}
          key={post.id}
          numLikes={post.likes.length}
          numComments={post.comments.length}
          />
        ))}
      </div>

      <div className="w-[35%]">
        <Card>
          <p className="text-sm text-muted-foreground pt-2">
            Your homepage - keep up to date with your favourite forums!
          </p>
          <Separator className="my-5" />

          <div className="flex flex-col gap-y-3">
            <Button asChild variant="secondary">
              <Link href="/forum/funny/create">Create Post</Link>
              </Button>
            <Button asChild><Link href="/forum/create">Create Forum</Link></Button>
          </div>
        </Card>

      </div>
    </div>
  );
}

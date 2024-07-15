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

async function getForums() {
  const data = await prisma.forum.findMany({
    select: {
      name: true,
    }
  });
  return data;
}

export default async function Home() {
  const data = await getData();
  const forums = await getForums();
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        {data.map((post)=> (
          <PostCard 
          title={post.title} 
          id={post.id} 
          key={post.id}
          textContent={post.textContent ?? ""}
          forumName={post.forumName as string}
          userName={post.author?.userName as string}
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
            <Button asChild><Link href="/forum/create">Create Forum</Link></Button>
            <Separator />
            <p className="font-semibold text-muted-foreground ml-2">Forums</p>
            {forums.map((forum) => (
              <Button asChild key={forum.name} variant="secondary">
                <Link href={`/forum/${forum.name}`}>{forum.name}</Link>
              </Button>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}

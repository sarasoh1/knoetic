"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUserName(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user) {
        return redirect("/api/auth/login");
    }
    const username = formData.get("username") as string;
    try {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                userName: username,
            }
        });
    
        return {
            message: "Successfully updated username",
            status: "success"
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // handle unique constraint
            if (error.code === "P2002") {
                return {
                    message: "This username is already taken",
                    status: "error"
                }
            }
        }
    }
    
}

export async function createForum(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    // redirect if user is not logged in
    if(!user) {
        return redirect("/api/auth/login");
    }
    try {
        const name = formData.get("name") as string;

        const data = await prisma.forum.create({
            data: {
                name: name,
                createdByUserId: user.id
            }
        });
        return redirect("/");
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return {
                    message: "Forum already exists!",
                    status: "error"
                }
            }
        }
    }
    

    return redirect("/");
}

export async function updateForumDescription(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user) {
         return redirect("/api/auth/login");
    }
    try {
        const forumName = formData.get("forumName") as string;
        const description = formData.get("description") as string;

        await prisma.forum.update({
            where: {
                name: forumName
            },
            data: {
                description: description
            }
        });

        return {
            status: "success",
            message: "Successfully updated forum description"
        };
    } catch (e) {
        return {
            status: "error",
            message: "An error occurred while updating forum description"
        };
    }
}

export async function createPost(
    formData: FormData
) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }
    
    const title = formData.get("title") as string;
    const forumName = formData.get("forumName") as string;
    const content = formData.get("textContent") as string;
    await prisma.post.create({
        data: {
            title: title,
            forumName: forumName,
            authorId: user.id,
            textContent: content ?? "",
        },
    })
    return redirect("/")
    
}

export async function updatePost(
    prevState: any, 
    formData: FormData
) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user) {
         return redirect("/api/auth/login");
    }
    const postId = formData.get("postId") as string;
    const postContent = formData.get("textContent") as string;

    await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            textContent: postContent
        }
    });

    return redirect(`/post/${postId}`);
}

export async function likePost(
    formData: FormData
) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        revalidatePath("/api/auth/login");
        return redirect("/api/auth/login");
    }

    const postId = formData.get("postId") as string;
    // checks if i've already liked the post
    const postLiked = await prisma.like.findFirst({
        where: {
            postId: postId,
            userId: user.id
        }
    }); 

    // if you already liked the post
    if (postLiked) {
        // ... and you click on the button again means you are unliking it
        await prisma.like.delete({
            where: {
                id: postLiked.id
            }
        });
    } else {
        await prisma.like.create({
            data: {
                postId: postId,
                userId: user.id
            }
        })
    }
    return revalidatePath("/");
}

export async function createComment(formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const comment = formData.get("comment") as string;
    const postID = formData.get("postId") as string;

    const data = await prisma.comment.create({
        data: {
            text: comment,
            postId: postID,
            authorId: user.id
        }
    });
    return revalidatePath(`/post/${postID}`);
}

export async function updateComment(
    prevState: any, 
    formData: FormData
) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user) {
         return redirect("/api/auth/login");
    }
    const commentId = formData.get("commentId") as string;
    const postId = formData.get("postId") as string;
    const textComment = formData.get("comment") as string;

    await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            text: textComment
        }
    });

    return redirect(`/post/${postId}`);
}

export async function deleteComment(formData: FormData){
    
    const commentId = formData.get("commentId") as string;
    const postId = formData.get("postId") as string;
    await prisma.comment.delete({
        where: {
            id: commentId
        }
    });

    return revalidatePath(`/post/${postId}`);
}

export async function deletePost(formData: FormData) {

    const postId = formData.get("postId") as string;
    await prisma.post.delete({
        where: {
            id: postId
        }
    });

    return redirect("/");
}

"use client";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { createForum } from "@/app/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SubmitButton } from "@/app/components/submit-button";

const initialState = {
    message: "",
    status: ""
}

export default function CreateForumPage() {
    const [state, formAction] = useFormState(createForum, initialState)
    const { toast } = useToast();

    useEffect(() => {
        if (state.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive"
            });
        }
    }, [state, toast])

    return (
        <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
            <form action={formAction}>
                <h1 className="text-3xl font-extrabold tracking-tight">
                    Create forum
                </h1>
                <Separator className="my-4" />
                <Label className="text-lg">Forum Name</Label>
                <p className="text-muted-foreground">
                    Forum names cannot be changed
                </p>

                <div className="relative mt-3">
                    <Input name="name" required className="pl-6" minLength={2} maxLength={21} /> 
                </div>
                <p className="mt-1 text-destructive">{state.message}</p>

                <div className="w-full flex mt-5 gap-x-5 justify-end">
                    <Button variant="secondary" asChild>
                        <Link href="/">Cancel</Link>
                    </Button>
                    <SubmitButton buttonName="Create"/>
                </div>
            </form>
        </div>
    )
}
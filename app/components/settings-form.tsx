"use client";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateUserName } from "../actions";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
    message: "",
    status: ""
}

export function SettingsForm({
    username }: {
        username: string | null | undefined;
    }
) {
    const [state, formAction] = useFormState(updateUserName, initialState);
    const { toast } = useToast();

    useEffect(
        () => {
            if (state?.status === "success") {
                toast({
                    title: "Successful",
                    description: state.message
                });
            } else if (state?.status === "error") {
                toast({
                    title: "Error",
                    description: state.message,
                    variant: 'destructive'
                });
            }
        }, [state, toast]
    );
    return (
        <form action={formAction}>
            <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
            <Separator className="my-4"/>
            <Label className="text-lg">Username</Label>
            <p className="text-muted-foreground">Change your username?</p>
            <Input defaultValue={username ?? undefined} name="username" required className="mt-2" min={2} maxLength={21} />

            {state?.status === 'error' && (<p className="text-destructive mt-1">(state.message)</p>)}

            <div className="w-full flex mt-5 gap-x-5 justify-end">
                <Button variant="secondary" asChild type="button">
                    <Link href="/">Cancel</Link>
                </Button>
                <SubmitButton buttonName="Change Username"/>
            </div>
        </form>
    )
}
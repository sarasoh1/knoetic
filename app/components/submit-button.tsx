"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton({buttonName}:{buttonName: string}) {
    const {pending} = useFormStatus();

    return (
        <>
        { pending ? (
            <Button disabled>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait
            </Button>
        ) : (
            <Button type="submit">{buttonName}</Button>
        )}
        </>
    )
}

export function SaveButton() {
    const {pending} = useFormStatus();
    return (
        <>
        {pending ? (
            <Button className="mt-2 w-full" disabled size="sm">
                <Loader2 className="mr-2 w-3 h-3 animate-spin" />
                Please wait
            </Button>
        ) : (
            <Button size="sm" className="mt-2 w-full" type="submit">Save</Button>
        )}
        </>
    )
}
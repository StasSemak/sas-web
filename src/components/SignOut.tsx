"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/Button";
import { useState } from "react";

export const SignOut = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onClick = () => {
        setIsLoading(true)

        try {
            signOut({
                callbackUrl: `${window.location.origin}/sign-in`
            })
        }
        catch {}
        finally {
            setIsLoading(false)
        }
    }

    return(
        <Button isLoading={isLoading} onClick={onClick}>
            Вийти
        </Button>
    )
}
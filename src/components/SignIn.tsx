"use client"

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/Button";
import { GoogleIcon } from "./icons/GoogleIcon";

export const SignIn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const signInWithGoogle = async () => {
        setIsLoading(true)

        try {
            await signIn('google')
        }
        catch {
        }
        finally {
            setIsLoading(false)
        }
    }

    return(
        <Button className="w-full" isLoading={isLoading} onClick={signInWithGoogle}>
            <GoogleIcon className="h-4 w-4 mr-2"/>
            Увійти
        </Button>
    )
}
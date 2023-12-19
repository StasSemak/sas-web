"use client"

import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { ReportBugPayload, ReportBugValidator } from "@/lib/validators/report-bug"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { ZodError } from "zod"
import { User } from "next-auth"

export const ReportBugForm = (user: Pick<User, "name" | "email">) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formValue, setFormValue] = useState<ReportBugPayload>({
        message: "",
        userEmail: user.email,
        userName: user.name,
    })
    const [error, setError] = useState<string | undefined>(undefined)
    const toast = useCustomToast();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        
        try{
            const data = ReportBugValidator.parse(formValue)
            //TODO: send message by email
            console.log(data)
            toast({
                type: "success",
                content: "Дякуємо за повідомлення!",
            })
            setFormValue({message: ""})
        }
        catch (err) {
            if(err instanceof ZodError) setError("Це поле обов'язкове!")
            else toast({
                type: "error",
                content: "Виникла помилка! Спробуйте ще раз",
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    return(
        <form className="flex gap-4 mt-2" onSubmit={onSubmit}>
            <div className="flex flex-col gap-1 flex-grow">
                <Input 
                    type="text" 
                    placeholder="Опишіть, що саме працює некоректно" 
                    onChange={(e) => {
                        if(e.target.value !== undefined) setError(undefined)
                        setFormValue({...formValue, message: e.target.value})
                    }}
                    name="message"
                    className="text-blue-950"
                />
                {!!error && <span className="text-sm">{error}</span>}
            </div>
            <Button type="submit" variant="light" isLoading={isLoading}>
                Надіслати
            </Button>
        </form>
    )
}
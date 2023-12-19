"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { ValidationPayload, ValidationValidator } from "@/lib/validators/validation";
import axios from "axios"
import { CONSTANTS } from "@/lib/constants";
import { z } from "zod";
import { useRouter } from "next/navigation";

export const VerificationForm = ({userId}: {userId: string}) => {
    const [formValue, setFormValue] = useState<ValidationPayload>({status: ""});
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            const data = ValidationValidator.parse(formValue)
            await axios.post(`${CONSTANTS.SERVER_URL}/api/users`, {
              userId: userId,
              roleId: data.status,
            })
            router.refresh();
        }
        catch (err) {
            if(err instanceof z.ZodError) setError("Це поле обов'язкове!");
            else setError("Помилка! Спробуйте ще раз.")
        }
        finally {
            setIsLoading(false)
        }
    }

    return(
        <form className="flex flex-col gap-4 w-full max-w-[360px]" onSubmit={onSubmit}>
            <Select onValueChange={(value) => {
                if(value !== "") setError(undefined)
                setFormValue({status: value})
              }}>
              <SelectTrigger className="w-full rounded-md bg-transparent h-12">
                <SelectValue placeholder="Мій статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Я працівник</SelectItem>
                  <SelectItem value="2">Я студент</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> 
            {error && <p className="text-center -mt-2">{error}</p>}
            <Button isLoading={isLoading} variant="light" type="submit">Підтвердити</Button>
        </form>
    )
}
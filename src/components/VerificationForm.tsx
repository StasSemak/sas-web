"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { VerificationPayload } from "@/lib/validators/validation";
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation";

export const VerificationForm = () => {
    const [formValue, setFormValue] = useState<VerificationPayload>({status: null});
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            await axios.post(`/api/users/set-role`, {
              status: formValue.status
            })
            router.refresh();
        }
        catch (err) {
            if(err instanceof AxiosError) {
              if(err.status === 400) setError("Це поле обов'язкове!")
              else setError("Помилка! Спробуйте ще раз.")
            }
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
                setFormValue({status: value as "STUDENT" | "WORKER" | null})
              }}>
              <SelectTrigger className="w-full rounded-md bg-transparent h-12">
                <SelectValue placeholder="Мій статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="WORKER">Я працівник</SelectItem>
                  <SelectItem value="STUDENT">Я студент</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> 
            {error && <p className="text-center -mt-2">{error}</p>}
            <Button isLoading={isLoading} variant="light" type="submit">Підтвердити</Button>
        </form>
    )
}
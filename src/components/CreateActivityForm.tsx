"use client"

import { Category, Institute } from "@/types/server";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateActivityPayload, CreateActivityValidator } from "@/lib/validators/create-activity";
import { Input } from "./ui/Input";
import { Label } from "./ui/label";
import ReactTextareaAutosize from "react-textarea-autosize";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";
import { DatePicker } from "./ui/DatePicker";
import { Image as ImageIcon, Loader2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils";
import { useFilePicker } from "use-file-picker";
import {
    FileAmountLimitValidator,
    FileSizeValidator,
} from 'use-file-picker/validators';
import { Button } from "./ui/Button";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { CONSTANTS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useCustomToast } from "@/hooks/use-custom-toast";

type Props = {
    categories: Category[];
    institutes: Institute[];
}

export const CreateActivityForm = ({categories, institutes}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const toast = useCustomToast();

    const {register, handleSubmit, formState: {errors}, setValue, trigger} = useForm<CreateActivityPayload>({
        resolver: zodResolver(CreateActivityValidator),
        defaultValues: {
            name: "",
            description: "",
            defaultPoints: "0",
            startDate: undefined,
            endDate: undefined,
            imageBase64: "",
            categoryId: 0,
            instituteId: 0,
        },
        mode: "onSubmit",
        shouldUnregister: false,
    })

    const onSubmit = async (payload: CreateActivityPayload) => {
        setIsLoading(true)

        try {
            await axios.post(`/api/activities/create`, payload)
            router.push("/")
        }
        catch (err) {
            let toastMessage: string;

            if(err instanceof AxiosError) toastMessage = "Помилка сервера! Спробуйте ще раз"
            else toastMessage = "Щось пішло не так! Спробуйте ще раз"

            toast({
                type: "error",
                content: toastMessage,
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    return(
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldWithLabel label="Назва події" error={errors.name}>
                <Input type="text" {...register("name")} placeholder="Що відбувається" className="h-12"/>
            </FieldWithLabel>
            <FieldWithLabel label="Опис події" error={errors.description}>
                <ReactTextareaAutosize 
                    className="resize-none flex min-h-[90px] w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("description")} 
                    placeholder="Короткий опис, деталі, умови"
                />
            </FieldWithLabel>
            <div className="grid grid-cols-3 gap-x-5 gap-y-8">
                <FieldWithLabel label="Бали за умовчанням" error={errors.defaultPoints}>
                    <Input 
                        type="number" 
                        {...register("defaultPoints")} 
                        placeholder="К-сть балів" 
                        className="h-12" 
                        min={0} 
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Дата початку" error={errors.startDate}>
                    <DatePicker 
                        placeholder="Дата початку"
                        changeHandler={(value) => {
                            setValue("startDate", value);
                            trigger("startDate");
                        }}
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Дата завершення" error={errors.endDate}>
                    <DatePicker 
                        placeholder="Дата завершення"
                        changeHandler={(value) => {
                            setValue("endDate", value);
                            trigger("endDate");
                        }}
                    />
                </FieldWithLabel>
                
                <div className="flex flex-col gap-8">
                    <FieldWithLabel label="Категорія" error={errors.categoryId}>
                        <SelectField
                            placeholder="Категорія"
                            options={categories}
                            changeHandler={(value) => {
                                setValue("categoryId", parseInt(value))
                                trigger("categoryId")
                            }}
                        />
                    </FieldWithLabel>
                    <FieldWithLabel label="Інститут" error={errors.instituteId}>
                        <SelectField
                            placeholder="ННІ"
                            options={institutes}
                            changeHandler={(value) => {
                                setValue("instituteId", parseInt(value))
                                trigger("instituteId")
                            }}
                        />
                    </FieldWithLabel>
                </div>

                <FieldWithLabel label="Фотографія (не більше 1 МБ)" error={errors.imageBase64}>
                    <SelectImage changeHandler={(value) => {
                        setValue("imageBase64", value)
                        trigger("imageBase64")
                    }}/>
                </FieldWithLabel>
                
                <div className="flex flex-col justify-end items-end">
                    <Button type="submit" variant="light" isLoading={isLoading} className="w-1/3">
                        Створити
                    </Button>
                </div>
            </div>
        </form>
    )
}

const FieldWithLabel = ({children, label, className, error}: {children: React.ReactNode, label: string, className?: string, error: FieldError | undefined}) => {
    return(
        <div className={cn("flex flex-col gap-1", className)}>
            <Label className="text-zinc-100 text-base">{label}</Label>
            {children}
            {!!error && <span className="text-zinc-100 text-sm">{error.message ?? "Тут помилка!"}</span>}
        </div>
    )
}

const SelectField = ({changeHandler, options, placeholder}: {
    changeHandler: (value: string) => void, 
    options: (Category | Institute)[], 
    placeholder: string;
}) => {
    return(
        <Select onValueChange={changeHandler}>
            <SelectTrigger className="w-full rounded-md bg-transparent h-12 text-zinc-100">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((item, index) => (
                        <SelectItem key={index} value={item.id.toString()}>{item.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

const SelectImage = ({changeHandler}: {
    changeHandler: (value: string) => void,
}) => {
    const [error, setError] = useState<string | undefined>(undefined)

    const {openFilePicker, loading, clear, filesContent} = useFilePicker({
        readAs: "DataURL",
        accept: 'image/*',
        multiple: false,
        validators: [
            new FileAmountLimitValidator({ max: 1 }),
            new FileSizeValidator({ maxFileSize: 1024 * 1024 }),
        ],
        onFilesSuccessfullySelected: (data) => {
            changeHandler(data.filesContent[0].content)
            setError(undefined)
        },
        onFilesRejected: ({ errors }) => {
            let msg: string;
            if(errors[0].name === "FileSizeError") msg = "Розмір фото перевищує 1 МБ!"
            else if(errors[0].name === "FileAmountLimitError") msg = "Обрано більше одного фото!"
            else msg = "Виникла помилка"
            setError(msg)
        }
    })

    return(
        <>
            {!!filesContent.length ?
                <>
                {filesContent.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="w-fit h-fit rounded-lg overflow-hidden">
                            <img
                                src={item.content}
                                alt={item.name}
                                className="h-48 select-none"
                            />
                        </div>
                        <Button 
                            variant="light" 
                            size="sm" 
                            aria-label="Видалити фотографію" 
                            onClick={() => {
                                clear()
                                changeHandler("")
                                setError(undefined)
                            }}
                        >
                            <Trash2 className="h-4 w-4 stroke-blue-950"/>
                        </Button>
                    </div>
                ))}
                </>
                :
                <div className="flex flex-col gap-1">
                    <ImagePlaceholder 
                        isLoading={loading}
                        onClick={openFilePicker}  
                        type="button" 
                        aria-label="Вибрати фотографію" 
                    />
                    {!!error && <span className="text-zinc-100 text-sm">{error}</span>}
                </div>
            }
        </>
    )
}

interface ImagePlaceholderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
}
const ImagePlaceholder = ({className, isLoading, ...props}: ImagePlaceholderProps) => {
    return(
        <button 
            className={cn("w-36 h-48 border border-zinc-100 rounded-lg flex flex-col gap-1 items-center justify-center group", className)}
            {...props}
        >
            {isLoading ? 
                <Loader2 className="h-12 w-12 animate-spin stroke-zinc-100"/>
            : 
            <>
                <ImageIcon strokeWidth={0.75} className="stroke-zinc-100 h-12 w-12 mt-3 group-hover:mt-0 transition-all"/>
                <p className="text-zinc-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Вибрати фото</p>
            </>
            }
        </button>
    )
}


import { z } from "zod";

export const CreateActivityValidator = z.object({
    name: z.string().min(2, {message: "Це поле обов'язкове!"}).max(100, {message: "Поле може містити не більше 100 символів!"}),
    description: z.string().min(10, {message: "Поле має містити не менше 10 символів!"}).max(4000, {message: "Поле може містити не більше 4000 символів!"}),
    defaultPoints: z.string().regex(/^\d+$/, {message: "Це поле має містити ціле невід'ємне число!"}),
    startDate: z.date({errorMap: () => ({
        message: "Це поле є обв'язковим!",
    })}),
    endDate: z.date({errorMap: () => ({
        message: "Це поле є обв'язковим!",
    })}),
    imageBase64: z.string(),
    categoryId: z.number().int().positive({message: "Це поле обов'язкове!"}),
    instituteId: z.number().int().positive({message: "Це поле обов'язкове!"}),
})

export type CreateActivityPayload = z.infer<typeof CreateActivityValidator>
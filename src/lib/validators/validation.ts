import { z } from "zod"

export const ValidationValidator = z.object({
    status: z.string().regex(/^\d$/, "Це поле є обов'язковим!"),
})

export type ValidationPayload = z.infer<typeof ValidationValidator>
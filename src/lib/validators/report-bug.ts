import { z } from "zod";

export const ReportBugValidator = z.object({
    message: z.string().min(1),
    userName: z.string().nullish(),
    userEmail: z.string().nullish(),
})

export type ReportBugPayload = z.infer<typeof ReportBugValidator>
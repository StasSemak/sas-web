import { z } from "zod"

export const VerificationValidator = z.object({
    status: z.enum(["STUDENT", "WORKER"]).nullable(),
})

export type VerificationPayload = z.infer<typeof VerificationValidator>
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { VerificationValidator } from "@/lib/validators/validation";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const data = VerificationValidator.parse(body)

        const session = await getAuthSession()
        if(!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }

        if(data.status === null) {
            return new Response("Invalid data", { status: 400 })
        }

        await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                role: data.status
            }
        })
        
        return new Response("OK", { status: 200 })
    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response("Invalid data", { status: 400 })
        }
        
        return new Response("Unable to process the request at the time. Try later", { status: 500 })
    }
}
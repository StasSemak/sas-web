import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateActivityPayload, CreateActivityValidator } from "@/lib/validators/create-activity";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const data = CreateActivityValidator.parse(body)

        const session = await getAuthSession();
        if(!session?.user) {
            return new Response("Unathorized", { status: 401 })
        }

        const dbUser = await db.user.findFirst({
            where: {
                id: session.user.id
            }
        })
        if(dbUser?.role === "GUEST" || dbUser?.role === "STUDENT") {
            return new Response("Access denied", { status: 403 })
        }

        type UploadPayload = Pick<CreateActivityPayload, "name" | "description" | "startDate" | "endDate" | "categoryId" | "instituteId"> & {
            defaultPoints: number;
            file: string;
            creatorId: string;
        } 
        const uploadPayload: UploadPayload = {
            ...data,
            defaultPoints: parseInt(data.defaultPoints),
            file: data.imageBase64,
            creatorId: session.user.id
        }

        await db.activity.create({
            data: uploadPayload
        })

        return new Response("OK", { status: 200 })
    } catch (error) {
        if(error instanceof z.ZodError) return new Response("Invalid data", { status: 400 })

        return new Response("Unable to process the request at the time. Try later", { status: 500 })
    }
}
import { CreateActivityForm } from "@/components/CreateActivityForm";
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

const CreateActivityPage = async () => {
    const session = await getAuthSession()
    const dbUser = await db.user.findFirst({
        where: {
            id: session?.user.id
        }
    })

    //if(!session?.user || dbUser?.role === "GUEST" || dbUser?.role === "STUDENT") notFound();
    if(!session?.user) notFound();

    const categories = await db.category.findMany()
    const institutes = await db.institute.findMany();

    return(
        <div className="flex flex-col gap-6">
            <h2 className="text-zinc-100 text-3xl font-medium">Створити подію</h2>
            <CreateActivityForm 
                categories={categories} 
                institutes={institutes}
            />
        </div>
    )
}

export default CreateActivityPage
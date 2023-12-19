import { CreateActivityForm } from "@/components/CreateActivityForm";
import { getAuthSession } from "@/lib/auth"
import { getAllCategories, getAllIntitutes } from "@/server/actions/forms";
import { getUserInfo } from "@/server/actions/users"
import { notFound } from "next/navigation";

const CreateActivityPage = async () => {
    const session = await getAuthSession()
    const info = await getUserInfo(session?.user.id);

    //if(!info || info.role !== "Працівник") notFound();
    if(!info) notFound();

    const categories = await getAllCategories();
    const institutes = await getAllIntitutes();

    return(
        <div className="flex flex-col gap-6">
            <h2 className="text-zinc-100 text-3xl font-medium">Створити подію</h2>
            <CreateActivityForm 
                userId={session?.user.id} 
                categories={categories} 
                institutes={institutes}
            />
        </div>
    )
}

export default CreateActivityPage
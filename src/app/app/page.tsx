import { ReportBugForm } from "@/components/ReportBugForm";
import { getAuthSession } from "@/lib/auth"
import { User } from "next-auth";

const AppPage = async () => {
    const session = await getAuthSession();

    if(!session) return null;

    return(
        <div className="flex flex-col h-full gap-8">
            <Greeting username={session.user.name ?? "користуваче"}/>
            <ReportBug {...session.user}/>
        </div>
    )
}
export default AppPage

const Greeting = ({username}: {username: string}) => {
    return(
        <h2 className="text-zinc-100 text-3xl font-medium">Вітаємо, {username}</h2>
    )
}

const Messages = () => {
    
}

const ReportBug = (props: Pick<User, "name" | "email">) => {
    return(
        <div className="flex flex-col gap-3">
            <h2 className="text-zinc-100 text-2xl font-medium">Натрапили на несправність?</h2>
            <p className="text-zinc-200">
                Додаток все ще на стадії розробки, тому можливі певні обмеження або несправності. Якщо у вас виникла проблема, повідомте про це нижче. Це сприятиме швидшому виправленню помилок. 
            </p>
            <ReportBugForm {...props}/>
        </div>
    )
}
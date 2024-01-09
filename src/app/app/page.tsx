import { ReportBugForm } from "@/components/ReportBugForm";
import { CustomMDX } from "@/components/mdx";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { getAuthSession } from "@/lib/auth"
import { getNewsPosts } from "@/lib/news";
import { User } from "next-auth";
import Link from "next/link";

const AppPage = async () => {
    const session = await getAuthSession();

    if(!session) return null;

    return(
        <div className="flex flex-col h-full gap-8">
            <Greeting username={session.user.name ?? "користуваче"}/>
            <News/>
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

const News = async () => {
    const posts = await getNewsPosts(3);

    return(
        <div className="flex flex-col gap-3 items-start w-full">
            <div className="flex w-full justify-between items-center">
                <h2 className="text-zinc-100 text-2xl font-medium">
                    Новини
                </h2>
                <Link href="/news" className={buttonVariants({variant: "light"})}>
                    Усі новини
                </Link>
            </div>
            <div className="flex w-full justify-between gap-5">
                {posts.map((post, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{post.data.title}</CardTitle>
                            <CardDescription>{post.data.createdAt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <article className="prose prose-neutral">
                                <CustomMDX source={post.content}/>
                            </article>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
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
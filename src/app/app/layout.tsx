import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavItem } from "@/components/app/AppNavbar"

const AppLayout = async ({children}: {children: React.ReactNode}) => {
    const session = await getAuthSession();
    const dbUser = await db.user.findFirst({
        where: {
            id: session?.user.id
        }
    })

    if (!session?.user) redirect("/sign-in")
    if (dbUser?.role === "GUEST") redirect("/")

    return(
        <div className="flex flex-col gap-5 min-h-screen">
            <Navbar />
            {children}
        </div>
    )
}
export default AppLayout

export type Route = {
    name: string
    slug: string
    icon: string
}

const Navbar = () => {
    const routes: Route[] = [
        {
            name: "Додому",
            slug: "/app",
            icon: "Home",
        },
        {
            name: "Події",
            slug: "/app/activities",
            icon: "CalendarCheck2",
        },
        {
            name: "Рейтинг",
            slug: "/app/rating",
            icon: "BarChart",
        },
        {
            name: "Магазин",
            slug: "/app/store",
            icon: "ShoppingBasket",
        },
    ]

    return(
        <div className="flex gap-5 w-full justify-between h-10">
            {routes.map((route, index) => (
                <NavItem key={index} {...route}/>
            ))}
        </div>
    )
}
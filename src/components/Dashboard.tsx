import { User } from "next-auth"
import { Button, buttonVariants } from "./ui/Button"
import { getUserInfo } from "@/server/actions/users"
import Link from "next/link"
import { ReportBugForm } from "./ReportBugForm"
import { Activity } from "@/types/server"
import Image from "next/image"
import { ArrowRight, Calendar } from "lucide-react"
import { DashboardSearchBar } from "./DashboardSearchBar"
import { db } from "@/lib/db"

export const Dashboard = async ({user}: {user: User}) => {
    return(
        <div className="w-full flex flex-col gap-8">
            <div className="flex justify-between">
                <Greeting userName={user.name ?? "користуваче"}/>
                <CreateLink userId={user.id}/>
            </div>
            <ActivitiesFeed/>
            <SearchBar/>
            <div className="grid grid-cols-12">
                <Ratings/>
            </div>
        </div>
    )
}

const Greeting = ({userName}: {userName: string}) => {
    return(
        <h2 className="text-zinc-100 text-3xl font-medium">Вітаємо, {userName}</h2>
    )
}

const CreateLink = async ({userId}: {userId: string}) => {
    const info = await getUserInfo(userId);
    
    return(
        <>
        {
            !!info && (
                info.role === "Студент" ? 
                    <Link href="/participations/create" className={buttonVariants({variant: "light"})}>
                        Повідомити про активність
                    </Link> 
                : 
                    <Link href="/activities/create" className={buttonVariants({variant: "light"})}>
                        Створити подію
                    </Link> 
            )
        }
        </>
    )
}

const ActivitiesFeed = async () => {
    const mockAct: Activity = {
        id: "some-badass-id",
        name: "Крута подія",
        description: "Крута подія для всіх",
        category: "Олімпіада",
        institute: "ННІАКОТ",
        images: [],
        createdAt: new Date(Date.now()),
        creatorId: "clp2lp8i30000c9fo4hjvg1uh",
        defaultPoints: 5,
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
    }
    const mockActivities: Activity[] = [
        mockAct,
        mockAct,
        mockAct,
        mockAct,
    ]
    
    return(
        <div className="flex flex-col gap-3">
            {/* <h2 className="text-zinc-100 text-xl font-medium">Нові події</h2> */}
            <div className="flex flex-row gap-3 flex-wrap"> 
                {mockActivities.map((item, index) => (
                    <ActivityCard activity={item} key={index}/>
                ))}
                <Link
                    href={'/activities'} 
                    className="border border-zinc-100 rounded-xl flex-grow flex flex-col justify-center items-center gap-0.5 group bg-transparent hover:bg-zinc-100 transition-all duration-300"
                >
                    <ArrowRight className="h-10 w-10 stroke-zinc-100 group-hover:stroke-blue-950 transition-all duration-300"/>
                    <p className="text-zinc-100 text-lg group-hover:text-blue-950 transition-all duration-300">Більше</p>
                </Link>
            </div>
        </div>
    )
}

const ActivityCard = ({activity}: {activity: Activity}) => {
    const {id, name, category, institute, startDate, endDate} = activity

    return(
        <Link 
            href={`/activities/${id}`} 
            className="h-40 w-72 border border-zinc-100 rounded-xl p-4 flex flex-col gap-3 group bg-transparent hover:bg-zinc-100 transition-all duration-300"
        >
            <div className="flex gap-2">
                <BulletBadge>{institute}</BulletBadge>
                <BulletBadge>{category}</BulletBadge>
            </div>
            <h3 className="text-zinc-100 group-hover:text-blue-950 text-xl font-medium flex-grow transition-colors duration-300">{name}</h3>
            <div className="flex gap-2">
                <Calendar className="h-5 w-5 stroke-zinc-100 group-hover:stroke-blue-950 transition-all duration-300"/>
                <span className="text-zinc-100 group-hover:text-blue-950 transition-colors duration-300">
                    {!!(startDate.toLocaleDateString() === endDate.toLocaleDateString()) ?
                        startDate.toLocaleDateString()
                    :
                        `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                    }
                </span>
            </div>
        </Link>
    )
}

const BulletBadge = ({children}: {children: React.ReactNode}) => {
    return(
        <span className="px-[10px] py-1 rounded-full bg-zinc-100 group-hover:bg-blue-950 text-blue-950 group-hover:text-zinc-100 w-min text-xs font-medium transition-all duration-300">
            {children}
        </span>
    )
}

const SearchBar = () => {
    return(
        <DashboardSearchBar/>
    )
}

const Ratings = async () => {
    const topRatedIds = [
        "clp2lp8i30000c9fo4hjvg1uh",
        "clp2lp8i30000c9fo4hjvg1uh",
        "clp2lp8i30000c9fo4hjvg1uh",
        "clp2lp8i30000c9fo4hjvg1uh",
        "clp2lp8i30000c9fo4hjvg1uh",
        "clp2lp8i30000c9fo4hjvg1uh",
        "clp2lp8i30000c9fo4hjvg1uh",
    ]


    return(
        <div className="col-span-3 flex flex-col bg-zinc-100 rounded-xl h-[400px]">
            
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
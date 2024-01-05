import { SignOut } from "@/components/SignOut"
import { getAuthSession } from "@/lib/auth"
import { dbRoleToString, formatPoints } from "@/lib/utils"
import { LineChart, Mail, User as UserIcon, UserSquare } from "lucide-react"
import { User } from "next-auth"
import Image from "next/image"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

const ProfilePage = async () => {
    const session = await getAuthSession()

    if(!session?.user) redirect("/sign-in")

    return(
        <div className="w-full flex flex-col gap-12">
            <ProfileData user={session?.user as User}/>
        </div>
    )
}
export default ProfilePage

const ProfileData = ({user}: {user: User}) => {
    return(
        <div className="w-full bg-zinc-100 p-6 md:p-12 rounded-2xl h-min">
            <div className="w-full flex gap-6 md:gap-12 flex-col md:flex-row items-center md:items-start">
                <ProfileImage image={user.image}/>
                <div className="flex flex-col gap-3 md:gap-5 flex-grow">
                    <h2 className="text-blue-950 text-3xl font-bold">{user.name}</h2>
                    <div className="text-blue-950 flex gap-2 items-center">
                        <Mail className="h-6 w-6 stroke-blue-950 flex-shrink-0"/>
                        <p className="text-lg font-medium truncate">{user.email}</p>
                    </div>
                    <UserInfo userId={user.id}/>
                </div>
                <SignOut/>
            </div>
        </div>
    )
}

const ProfileImage = ({image}: {image: string | null | undefined}) => {
    return(
        <>
        {image ? 
            <div className="h-24 w-24 md:h-32 md:w-32 relative rounded-md overflow-hidden flex-shrink-0">
                <Image
                    src={image}
                    alt="Зображення профілю"
                    fill
                    className="select-none"
                />
            </div>
        :
            <UserSquare className="h-24 w-24 md:h-32 md:w-32 stroke-blue-950 block flex-shrink-0"/>
        }
        </>
    )
}
const UserInfo = async ({userId}: {userId: string | undefined}) => {
    const info = await db.user.findFirst({
        where: {
            id: userId
        }
    })

    return(
        <div className="flex flex-col gap-2 text-blue-950 -mt-1 md:-mt-3">
            {!!info &&
            <>
                <div className="flex gap-2 items-center">
                    <UserIcon className="h-6 w-6 stroke-blue-950"/>
                    <p className="text-lg font-medium">{dbRoleToString(info.role)}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <LineChart className="h-6 w-6 stroke-blue-950"/>
                    <p className="text-lg font-medium">{info.points} {formatPoints(info.points)}</p>
                </div>
            </>
            }
        </div>
    )
}
import Link from "next/link"
import Image from "next/image"

export const UserAvatar = ({userImage}: {userImage: string | null | undefined}) => {
    return(
        <Link href="/profile" aria-label="Профіль користувача">
                {userImage ?
                <div className="h-11 w-11 relative rounded-full overflow-hidden">
                    <Image
                        src={userImage}
                        alt="Зображення профілю"
                        fill
                        referrerPolicy="no-referrer"
                        className="select-none"
                    />
                </div>
                :
                <p className="text-zinc-100">Профіль</p>
                }
        </Link>
    )
}
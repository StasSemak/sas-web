import Link from "next/link"
import logo from "../../public/img/logo_white.png"
import logoSmall from "../../public/img/logo_small_white.png"
import Image from "next/image"
import { buttonVariants } from "./ui/Button"
import { UserAvatar } from "./UserAvatar"
import { getAuthSession } from "@/lib/auth"
import { BetaLabel } from "./BetaLabel"

export const Header = async () => {
    const session = await getAuthSession();

    return(
        <header className="h-[72px] bg-blue-950 border-b border-zinc-300">
            <nav className="max-w-[1440px] mx-auto h-full px-4 md:px-[60px] flex flex-row justify-between items-center">
                <div className="flex h-full items-center">
                    <Link href="/" aria-label="Додому">
                        <Image
                            src={logo}
                            alt="Логотип НУВГП"
                            height={64}
                            className="hidden md:flex select-none"
                        />
                        <Image
                            src={logoSmall}
                            alt="Логотип НУВГП"
                            height={64}
                            className="flex md:hidden select-none"
                        />
                    </Link>
                    <BetaLabel/>
                </div>
                <div>
                    {session ? 
                        <UserAvatar userImage={session.user.image}/>
                    : 
                    <Link href="/sign-in" className={buttonVariants({variant: "light"})}>
                        Увійти
                    </Link>
                    }   
                </div>
            </nav>
        </header>
    )
}
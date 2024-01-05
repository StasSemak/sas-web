import Image from "next/image"
import logoSmall from "../../public/img/logo_small_white.png"
import Link from "next/link"

export const Footer = async () => {
    return(
        <footer className="h-20 bg-blue-950 border-t border-zinc-300">
            <div className="max-w-[1440px] mx-auto h-full px-4 md:px-[60px] flex flex-row items-center text-zinc-100 justify-between py-1">
                <p>&copy; {new Date(Date.now()).getFullYear()}</p>
                <p className="hidden md:block max-w-[400px] text-xs text-blue-400">
                    Додаток знаходиться у стадії розробки. Певний функціонал може бути обмежений або працювати некоректно.
                    {' '}
                    <Link className="underline underline-offset-2" href="/version-log">Список версій.</Link>
                </p>
                <Image
                    src={logoSmall}
                    alt="Логотип НУВГП"
                    width={64}
                    className="select-none"
                />
            </div>
        </footer>
    )
}
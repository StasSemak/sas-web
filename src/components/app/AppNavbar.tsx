"use client";

import { Route } from "@/app/app/layout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../icons/icons";

export const NavItem = ({ name, slug, icon }: Route) => {
    const pathname = usePathname();
    const Icon = Icons[icon]

    return(
        <Link 
            href={slug} 
            className={cn("w-full hover:bg-zinc-100 hover:text-blue-950 transition-all rounded-md flex items-center justify-center gap-3 group",
                pathname === slug ? "bg-zinc-100 text-blue-950" : "bg-transparent text-zinc-100",
            )}
        >
            <Icon className={cn("stroke-zinc-100 group-hover:stroke-blue-950 h-5 w-5 transition-all group-active:stroke-blue-950", 
                pathname === slug ? "stroke-blue-950" : "stroke-zinc-100",
            )}/>
            <span className="text-lg mt-0.5">{name}</span>
        </Link>
    )
}
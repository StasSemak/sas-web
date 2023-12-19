"use client"

import Link from "next/link"
import { Input } from "./ui/Input"
import { buttonVariants } from "./ui/Button"
import { Search } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export const DashboardSearchBar = () => {
    const [query, setQuery] = useState<string>("")

    return(
        <div className="w-full flex gap-3">
            <Input type="text" placeholder="Введіть пошуковий запит" onChange={(e) => setQuery(e.target.value)} className="text-blue-950"/>
            <Link href={`/search?q=${query}`} className={buttonVariants({variant: "light"})}>
                <Search className="h-4 w-4 mr-2"/>
                <span className="pt-0.5">Знайти</span>
            </Link>
            <Link href={`/search?f=true&q=${query}`} className={cn(buttonVariants({variant: "light"}), "flex-shrink-0")}>
                <span className="pt-0.5">Розширений пошук</span>
            </Link>
        </div>
    )
}
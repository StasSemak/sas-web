"use server"

import { CONSTANTS } from "@/lib/constants"
import { Category, Institute } from "@/types/server"

export const getAllCategories = async () => {
    const res = await fetch(`${CONSTANTS.SERVER_URL}/api/categories`)
    const value = await res.json() as Category[]
    return value
}

export const getAllIntitutes = async () => {
    const res = await fetch(`${CONSTANTS.SERVER_URL}/api/institutes`)
    const value = await res.json() as Institute[]
    return value
}
"use server"

import { CONSTANTS } from "@/lib/constants"

export const getIsRoleChoosed = async (userId: string | undefined) => {
    if(!userId) return undefined;

    const res = await fetch(`${CONSTANTS.SERVER_URL}/api/users/role-choosed/${userId}`);
    const value = await res.json() as { isChoosed: boolean };
    return value.isChoosed;
}

export const getUserInfo = async (userId: string | undefined) => {
    if(!userId) return undefined;

    const res = await fetch(`${CONSTANTS.SERVER_URL}/api/users/${userId}`);
    const value = await res.json() as { points: number; role: string; }
    return value
}
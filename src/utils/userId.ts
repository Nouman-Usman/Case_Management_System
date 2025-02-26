"use server";
import {auth } from "@clerk/nextjs/server"
export default async function getUserId() {
    const { userId } = await auth()
    return userId;
}
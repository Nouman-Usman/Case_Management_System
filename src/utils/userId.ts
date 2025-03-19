"use server";
import { auth } from "@clerk/nextjs/server"

export default async function getUserId() {
    const { userId } = await auth()
    
    if (!userId) return null;
    
    // Extract the last 16 characters
    const finalId = userId.slice(-16);
    
    return finalId;
}
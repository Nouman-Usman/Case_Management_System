"use server"
import getUserId from "../../utils/userId";
import { createClerkClient } from '@clerk/nextjs/server'
// import { clerkClient } from "@clerk/nextjs/server";


export async function getUserDetailsByUserId() {
    const userId = await getUserId();   
    // const response = await clerkClient.users.getUser(userId)
    // const userDetails = await response.json();
    // return userDetails;

        const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

        const client = clerkClient

        if (!userId) {
            throw new Error("User ID is null or undefined");
        }

        const userList = await client.users.getUserOauthAccessToken(userId, "google");
        if (!userList) {
            throw new Error("User not authorized to access this resource");
        }
        // console.log(userList.data);        
        const data = userList.data;
        
        console.log(data);
}
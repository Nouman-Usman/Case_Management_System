"use server"
import { createClerkClient } from '@clerk/nextjs/server'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
const client = clerkClient
export async function addUserToClerk(email: string, password: string, type: string) {
    try {
        const response = await client.users.createUser({
            username: "Test456240576",
            emailAddress: [
                email
            ],
            password: password
        });
        if (!response) {
            throw new Error("User not authorized to access this resource");
        }
        else {
            console.log(response);
            updateMetadata(response.id, type);
            return response;
        }

    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error for better error handling
    }

}


function updateMetadata(userId: string, value: string) {
    const userList = client.users.updateUserMetadata(userId,
        {
            publicMetadata: {
                role: value,
                onboardingComplete: false
            },
        }
    );
    if (!userList) {
        throw new Error("User not authorized to access this resource");
    }
    // const data = userList.data;
    // console.log(data);
}
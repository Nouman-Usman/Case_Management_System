"use server";

import { createClerkClient } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
const client = clerkClient;

export async function addUserToClerk(email: string, password: string, type: string) {
  try {
    // Basic input validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Invalid email format");
    }
    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const response = await client.users.createUser({
      emailAddress: [email],
      password: password,
    });

    console.log("User created:", response);
    await updateMetadata(response.id, type);

    // Return a plain object with only the necessary data
    return {
      id: response.id,
      emailAddress: response.emailAddresses[0].emailAddress,
      createdAt: response.createdAt,
    };
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.clerkError && error.errors) {
      console.error("Clerk validation errors:", error.errors);
      throw new Error(`Failed to create user: ${error.errors[0]?.message || "Unknown error"}`);
    }
    throw error;
  }
}

async function updateMetadata(userId: string, value: string) {
  try {
    const response = await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: value,
        onboardingComplete: false,
      },
    });
    console.log("Metadata updated for user:", userId);
  } catch (error) {
    console.error("Error updating metadata:", error);
    throw error;
  }
}
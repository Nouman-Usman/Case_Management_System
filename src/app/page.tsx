"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { databases, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite.config";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs';
export const updateUserRole = async (userId: string, role: "user" | "chamber") => {
  try {
    const updatedUser = await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      userId,
      {
        role,
      }
    );

    console.log("User role updated successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <ClerkProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <main className="flex flex-col gap-8 items-center">
          <h1 className="text-2xl font-bold">Welcome to Case Management System</h1>
          <Button
            onClick={() => router.push("/signup")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </Button>
          <SignedOut>
            <SignInButton 
              fallbackRedirectUrl={"/"} 
              forceRedirectUrl={`/onboarding`}
            />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Button
            onClick={() => router.push("/forgot-password")}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Forgot Password
          </Button>
          <Button
            onClick={() => router.push("/onboarding")}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Onboarding
          </Button>
        </main>
      </div>
    </ClerkProvider>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { databases, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite.config";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold">Welcome to Case Management System</h1>
        <Button
          onClick={() => router.push("/sign-up")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          sign-up
        </Button>
        <Button
          onClick={() => router.push("/sign-in")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          sign In
        </Button>
        
      </main>
    </div>
  );
}

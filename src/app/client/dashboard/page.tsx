"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import  getUserId from "@/utils/userId";

export default function Home() {
  const router = useRouter();
  const userId = getUserId();
  console.log("UserId is:", userId); 
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <main className="flex flex-col gap-8 items-center">
          <h1 className="text-2xl font-bold"> Client Dashboard</h1>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Forgot Password
          </Button>
        </main>
      </div>
  );
}

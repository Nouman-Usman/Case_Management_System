"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { updateUserRole } from "@/backend/auth/onBoarding";
import { Button } from "@/components/ui/button";

export default function OnboardingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [error, setError] = useState("");

  const handleRoleSelection = async (role: "user" | "chamber") => {
    if (!userId) {
      setError("User ID is missing.");
      return;
    }
    try {
      await updateUserRole(userId, role);
      router.push("/dashboard"); // Redirect to the dashboard or another page
    } catch (error) {
      console.error("Error updating user role:", error);
      setError("Failed to update user role.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Select Your Role</h1>
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <div className="flex gap-4">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleRoleSelection("user")}
        >
          User
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleRoleSelection("chamber")}
        >
          Chamber
        </Button>
      </div>
    </div>
  );
}
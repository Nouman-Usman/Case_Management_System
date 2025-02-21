"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCurrentUserId, getUser } from "@/backend/auth/functions";
import { updateUserRole } from "@/backend/auth/onBoarding";
import { Button } from "@/components/ui/button";

const OnboardingPage = () => {
  const router = useRouter();
  const { userId } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user_id = await getCurrentUserId();
        if (user_id === null) {
          throw new Error("User ID is null");
        }
        await getUser(user_id); // Fetch user data if needed
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleRoleSelection = async (role: "user" | "chamber") => {
    if (!userId || Array.isArray(userId)) {
      setError("User ID is missing or invalid.");
      return;
    }
    try {
      await updateUserRole(userId as string, role);
      if (role === "chamber") {
        router.push(`/chamber-registration?userId=${userId}`); // Redirect to chamber registration page
      } else {
        router.push(`/user-registration?userId=${userId}`); // Redirect to user registration page
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      setError("Failed to update user role.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
};

export default OnboardingPage;


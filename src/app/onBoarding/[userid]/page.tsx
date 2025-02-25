// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// // import { updateUserRole } from "@/backend/auth/onBoarding";
// import { account } from "@/lib/appwrite.config";
// import { Button } from "@/components/ui/button";

// export default function OnboardingPage({ params }: { params: { userid: string } }) {
//   const router = useRouter();
//   const userId = params.userid; // Use the userid from params directly
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const sessions = await account.listSessions();
//         if (sessions.sessions.length === 0) {
//           console.log("No active session found. Redirecting to login.");
//           router.push("/login");
//         }
//       } catch (error) {
//         console.error("Error checking session:", error);
//         router.push("/login");
//       }
//     };

//     // checkSession();
//   }, [router]);

//   const handleRoleSelection = async (role: "user" | "chamber") => {
//     if (!userId) {
//       setError("User ID is missing.");
//       return;
//     }
//     try {
//       // await updateUserRole(userId, role);
//       router.push("/dashboard"); // Changed to redirect to dashboard after role selection
//     } catch (error) {
//       console.error("Error updating user role:", error);
//       setError("Failed to update user role.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Select Your Role</h1>
//       {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
//       <div className="flex gap-4">
//         <Button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={() => handleRoleSelection("user")}
//         >
//           User
//         </Button>
//         <Button
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//           onClick={() => handleRoleSelection("chamber")}
//         >
//           Chamber
//         </Button>
//       </div>
//     </div>
//   );
// }


'use client'

export default function OnboardingPage({ params }: { params: { userId: string } }) {
  console.log("User ID is :", params.userId);
  return (
    <div>
      <h1>Onboarding Page</h1>
      <p>User ID: {params.userId}</p>
    </div>
  );
}
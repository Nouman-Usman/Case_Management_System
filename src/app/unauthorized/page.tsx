"use client";
import { useRouter } from "next/navigation";
import { FiAlertTriangle } from "react-icons/fi";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="flex justify-center mb-6">
          <FiAlertTriangle className="text-red-500 text-6xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, you don't have permission to access this page. Please log in with appropriate credentials.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

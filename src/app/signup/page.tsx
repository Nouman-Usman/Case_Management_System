"use client";

import {SignupForm} from "@/components/forms/signup-form";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SignupForm />
    </div>
  );
}
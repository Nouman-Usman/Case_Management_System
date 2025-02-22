"use client";

import { LoginForm } from "@/components/forms/Authentication/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
}
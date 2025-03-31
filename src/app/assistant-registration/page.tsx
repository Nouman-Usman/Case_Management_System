"use client";

import AssistantRegistrationForm from "@/components/forms/Registration/assistant-reg-form";

const AssistantRegistrationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold">Assistant Registration</h1>
        <AssistantRegistrationForm />
      </main>
    </div>
  );
};

export default AssistantRegistrationPage;
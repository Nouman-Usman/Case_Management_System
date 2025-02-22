"use client";

import ClientRegistrationForm from "@/components/forms/Registration/client-reg-form";

const ClientRegistrationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold">Client Registration</h1>
        <ClientRegistrationForm />
      </main>
    </div>
  );
};

export default ClientRegistrationPage;
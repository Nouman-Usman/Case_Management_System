"use client";

import LawyerRegistrationForm from "@/components/forms/Registration/lawyer-reg-form";

const LawyerRegistrationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold">Lawyer Registration</h1>
        <LawyerRegistrationForm />
      </main>
    </div>
  );
};

export default LawyerRegistrationPage;
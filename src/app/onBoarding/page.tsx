"use client";

import { Suspense } from "react";
import OnboardingPageContent from "@/components/forms/Authentication/onboarding-page-content";

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingPageContent />
    </Suspense>
  );
}
"use client";

import { Suspense } from "react";
import OnboardingPageContent from "@/components/forms/Authentication/onboarding-page-content";

export default function OnboardingComponent() {
  const { user } = useUser()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null)

  const renderForm = () => {
    switch (selectedRole) {
      case 'client':
        return <ClientOnboardingForm />
      case 'chamber':
        return <ChamberOnboardingForm />
      default:
        return null
    }
  }
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingPageContent />
    </Suspense>
  );
}
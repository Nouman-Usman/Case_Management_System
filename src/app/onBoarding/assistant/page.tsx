'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import AssistantOnboardingForm from '@/components/forms/assistant-onboarding'

export default function OnboardingComponent() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      <AssistantOnboardingForm />
    </div>
  )
}
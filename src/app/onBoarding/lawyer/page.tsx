'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import LawyerOnboardingForm from '@/components/forms/lawyer-onboarding'


export default function OnboardingComponent() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      <LawyerOnboardingForm />
    </div>
  )
}
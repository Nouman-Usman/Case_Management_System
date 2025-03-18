'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './_actions'
import ChamberOnboardingForm from '@/components/forms/chamber-onboarding'
import ClientOnboardingForm from '@/components/forms/client-onboarding'
import { RoleSelection } from '@/components/forms/role-selection'

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
    <div className="container mx-auto py-8">
      {!selectedRole ? (
        <RoleSelection onRoleSelect={setSelectedRole} />
      ) : (
        <div>
          <button 
            onClick={() => setSelectedRole(null)}
            className="mb-4 text-blue-500 hover:text-blue-700 px-4"
          >
            ← Back to role selection
          </button>
          {renderForm()}
        </div>
      )}
    </div>
  )
}
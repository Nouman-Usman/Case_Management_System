'use client'

import { useState } from 'react'

interface RoleCardProps {
  title: string
  description: string
  selected: boolean
  onClick: () => void
}

const RoleCard = ({ title, description, selected, onClick }: RoleCardProps) => (
  <div
    onClick={onClick}
    className={`p-6 rounded-lg cursor-pointer transition-all ${
      selected
        ? 'bg-blue-100 border-2 border-blue-500'
        : 'bg-white border-2 border-gray-200 hover:border-blue-300'
    }`}
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

export const RoleSelection = ({
  onRoleSelect,
}: {
  onRoleSelect: (role: string | null) => void
}) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    onRoleSelect(role)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose your role</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <RoleCard
          title="Client"
          description="Join as a client to seek legal services"
          selected={selectedRole === 'client'}
          onClick={() => handleRoleSelect('client')}
        />
        <RoleCard
          title="Chamber"
          description="Join as a legal chamber to provide services"
          selected={selectedRole === 'chamber'}
          onClick={() => handleRoleSelect('chamber')}
        />
      </div>
    </div>
  )
}

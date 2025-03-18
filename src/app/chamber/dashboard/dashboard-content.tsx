"use client"

import { useState } from 'react'
import { FaUserTie, FaUserFriends, FaBullhorn, FaRobot, FaGavel } from 'react-icons/fa'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddLawyerForm from '@/components/forms/lawyer/add-lawyer'

interface DashboardContentProps {
  userId?: string
  userName?: string
}

export default function DashboardContent({ userId, userName }: DashboardContentProps) {
  const [isAddLawyerOpen, setIsAddLawyerOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 bg-indigo-600">
          <h2 className="text-2xl font-bold text-white">Chamber Dashboard</h2>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-3">
            <Dialog open={isAddLawyerOpen} onOpenChange={setIsAddLawyerOpen}>
              <DialogTrigger asChild>
                <button className="flex w-full items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                  <FaUserTie className="w-5 h-5 mr-3 text-indigo-600" />
                  <span className="text-sm font-medium">Add Lawyers</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <AddLawyerForm />
              </DialogContent>
            </Dialog>

            {[
              { icon: FaUserFriends, label: 'Add Assistants', href: '#' },
              { icon: FaUserTie, label: 'Manage Lawyers', href: '#' },
              { icon: FaUserFriends, label: 'Manage Assistants', href: '#' },
              { icon: FaBullhorn, label: 'Announcements', href: '#' },
              { icon: FaRobot, label: 'AI Chatbot', href: '#' },
              { icon: FaGavel, label: 'Manage Cases', href: '#' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                <item.icon className="w-5 h-5 mr-3 text-indigo-600" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome, {userName}</h1>
          <p className="text-gray-600">Chamber ID: {userId}</p>
        </header>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Total Lawyers</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Total Assistants</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Active Cases</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

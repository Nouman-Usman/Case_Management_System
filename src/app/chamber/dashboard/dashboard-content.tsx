"use client"

import { useState, useEffect } from 'react'
import { FaUserTie, FaUserFriends, FaBullhorn, FaRobot, FaGavel, FaHome } from 'react-icons/fa'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddLawyerForm from '@/components/forms/lawyer/add-lawyer'
import AddAssistantForm from '@/components/forms/assistant/add-assistant'
import { LawyersDataTable } from '@/components/tables/lawyers-table'
import { AssistantsDataTable } from '@/components/tables/assistants-table'
import { lawyersCountAssociatedChamber } from '@/lib/actions/lawyer.actions'

interface DashboardContentProps {
  userId?: string
  userName?: string
}

export default function DashboardContent({ userId, userName }: DashboardContentProps) {
  const [isAddLawyerOpen, setIsAddLawyerOpen] = useState(false)
  const [isAddAssistantOpen, setIsAddAssistantOpen] = useState(false)
  const [showLawyersTable, setShowLawyersTable] = useState(false)
  const [showAssistantsTable, setShowAssistantsTable] = useState(false)
  const [activeView, setActiveView] = useState<'home' | 'lawyers' | 'assistants' | 'announcements' | 'chatbot' | 'cases'>('home')
  const [lawyerCount, setLawyerCount] = useState(0)

  useEffect(() => {
    const fetchLawyerCount = async () => {
      if (userId) {
        const result = await lawyersCountAssociatedChamber()
        setLawyerCount(result || 0)
      }
    }
    fetchLawyerCount()
  })

  const resetView = () => {
    setShowLawyersTable(false)
    setShowAssistantsTable(false)
    setActiveView('home')
  }

  const handleNavigation = (view: 'lawyers' | 'assistants' | null) => {
    setShowLawyersTable(view === 'lawyers')
    setShowAssistantsTable(view === 'assistants')
    if (view) setActiveView(view)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 bg-indigo-600">
          <h2 className="text-2xl font-bold text-white">Chamber Dashboard</h2>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-3">
            <button 
              onClick={resetView}
              className={`flex w-full items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200 ${
                activeView === 'home' ? 'bg-indigo-100 ring-2 ring-indigo-600' : ''
              }`}
            >
              <FaHome className="w-5 h-5 mr-3 text-indigo-600" />
              <span className="text-sm font-medium">Home</span>
            </button>

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

            <Dialog open={isAddAssistantOpen} onOpenChange={setIsAddAssistantOpen}>
              <DialogTrigger asChild>
                <button className="flex w-full items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                  <FaUserFriends className="w-5 h-5 mr-3 text-indigo-600" />
                  <span className="text-sm font-medium">Add Assistants</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <AddAssistantForm />
              </DialogContent>
            </Dialog>

            {[
              { icon: FaUserTie, label: 'Manage Lawyers', view: 'lawyers' as const, onClick: () => handleNavigation('lawyers') },
              { icon: FaUserFriends, label: 'Manage Assistants', view: 'assistants' as const, onClick: () => handleNavigation('assistants') },
              { icon: FaBullhorn, label: 'Announcements', view: 'announcements' as const, onClick: () => setActiveView('announcements') },
              { icon: FaRobot, label: 'AI Chatbot', view: 'chatbot' as const, onClick: () => setActiveView('chatbot') },
              { icon: FaGavel, label: 'Manage Cases', view: 'cases' as const, onClick: () => setActiveView('cases') },
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`flex w-full items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200 ${
                  activeView === item.view ? 'bg-indigo-100 ring-2 ring-indigo-600' : ''
                }`}
              >
                <item.icon className="w-5 h-5 mr-3 text-indigo-600" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {showLawyersTable ? 'Manage Lawyers' : showAssistantsTable ? 'Manage Assistants' : `Welcome, ${userName}`}
          </h1>
          {!showLawyersTable && !showAssistantsTable && <p className="text-gray-600">Chamber ID: {userId}</p>}
        </header>
        
        {showLawyersTable ? (
          <LawyersDataTable />
        ) : showAssistantsTable ? (
          <AssistantsDataTable />
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Total Lawyers</h3>
              <p className="text-3xl font-bold text-indigo-600">{lawyerCount}</p>
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
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from 'react'
import { FaUserTie, FaUserFriends, FaBullhorn, FaRobot, FaGavel, FaHome, FaBell, FaCrown } from 'react-icons/fa'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddLawyerForm from '@/components/forms/lawyer/add-lawyer'
import AddAssistantForm from '@/components/forms/assistant/add-assistant'
import { LawyersDataTable } from '@/components/tables/lawyers-table'
import { AssistantsDataTable } from '@/components/tables/assistants-table'
import { CasesDataTable } from '@/components/tables/cases-table'
import { lawyersCountAssociatedChamber,assistantCountAssociatedChamber,totalActiveCases } from '@/lib/actions/lawyer.actions'

interface DashboardContentProps {
  userId?: string
  userName?: string
}

export default function DashboardContent({ userId, userName }: DashboardContentProps) {
  const [isAddLawyerOpen, setIsAddLawyerOpen] = useState(false)
  const [isAddAssistantOpen, setIsAddAssistantOpen] = useState(false)
  const [showLawyersTable, setShowLawyersTable] = useState(false)
  const [showAssistantsTable, setShowAssistantsTable] = useState(false)
  const [showCasesTable, setShowCasesTable] = useState(false)
  const [activeView, setActiveView] = useState<'home' | 'lawyers' | 'assistants' | 'announcements' | 'chatbot' | 'cases'>('home')
  const [lawyerCount, setLawyerCount] = useState(0);
  const [assistantCount, setAssistantCount] = useState(0);
  const [casesCount, setCasesCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      if (!userId) {
        console.log("No userId provided, skipping fetch");
        return;
      }

      try {
        // Fetch all counts concurrently
        const [lawyers, assistants, cases] = await Promise.all([
          lawyersCountAssociatedChamber().catch((err) => {
            console.error("Failed to fetch lawyer count:", err);
            return 0; // Fallback value
          }),
          assistantCountAssociatedChamber().catch((err) => {
            console.error("Failed to fetch assistant count:", err);
            return 0; // Fallback value
          }),
          totalActiveCases().catch((err) => {
            console.error("Failed to fetch cases count:", err);
            return 0; // Fallback value
          }),
        ]);

        setLawyerCount(lawyers);
        setAssistantCount(assistants);
        setCasesCount(cases);
      } catch (error) {
        console.error("Unexpected error fetching counts:", error);
      }
    };

    fetchCounts();
  }, [userId]);

  const resetView = () => {
    setShowLawyersTable(false)
    setShowAssistantsTable(false)
    setShowCasesTable(false)
    setActiveView('home')
  }

  const handleNavigation = (view: 'lawyers' | 'assistants' | 'cases' | null) => {
    setShowLawyersTable(view === 'lawyers')
    setShowAssistantsTable(view === 'assistants')
    setShowCasesTable(view === 'cases')
    if (view) setActiveView(view)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 bg-blue-600">
          <h2 className="text-2xl font-bold text-white">Client Portal</h2>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-3">
            {[
              { icon: FaGavel, label: 'Next Hearing', href: '#' },
              { icon: FaBell, label: 'Case Updates', href: '#' },
              { icon: FaRobot, label: 'AI Expert', href: '#' },
              { icon: FaUserTie, label: 'Find Lawyer', href: '#' },
              { icon: FaCrown, label: 'Subscription', href: '#' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <item.icon className="w-5 h-5 mr-3 text-blue-600" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome to Your Legal Dashboard</h1>
          <p className="text-gray-600">Client ID: {userId}</p>
        </header>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Active Cases</h3>
            <p className="text-3xl font-bold text-blue-600">{casesCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Next Hearing</h3>
            <p className="text-xl font-bold text-blue-600">Dec 15, 2023</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Subscription Status</h3>
            <p className="text-xl font-bold text-green-600">Active</p>
          </div>
        </div>

        {/* Recent Updates Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Case Updates</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600">Today</p>
              <p className="text-gray-800">Document submission deadline approaching</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600">Yesterday</p>
              <p className="text-gray-800">Case hearing rescheduled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

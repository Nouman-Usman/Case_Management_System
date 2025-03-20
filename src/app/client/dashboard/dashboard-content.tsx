"use client"

import { useState, useEffect } from 'react'
import { FaUserTie, FaUserFriends, FaBullhorn, FaRobot, FaGavel, FaHome, FaBell, FaCrown, FaFileAlt, FaCalendarAlt, FaComments, FaMoneyBillWave, FaFile, FaQuestion } from 'react-icons/fa'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
// import AddLawyerForm from '@/components/forms/lawyer/add-lawyer'
// import AddAssistantForm from '@/components/forms/assistant/add-assistant'
// import { LawyersDataTable } from '@/components/tables/lawyers-table'
// import { AssistantsDataTable } from '@/components/tables/assistants-table'
// import { CasesDataTable } from '@/components/tables/cases-table'
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
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 bg-blue-600">
          <h2 className="text-2xl font-bold text-white">Client Portal</h2>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="px-4 space-y-3 py-6">
            {[
              { icon: FaGavel, label: 'Active Cases', href: '#' },
              { icon: FaCalendarAlt, label: 'Hearings Calendar', href: '#' },
              { icon: FaFileAlt, label: 'Documents', href: '#' },
              { icon: FaBell, label: 'Notifications', href: '#' },
              { icon: FaComments, label: 'Chat with Lawyer', href: '#' },
              { icon: FaRobot, label: 'AI Legal Assistant', href: '#' },
              { icon: FaMoneyBillWave, label: 'Payments', href: '#' },
              { icon: FaUserTie, label: 'Find Lawyer', href: '#' },
              { icon: FaFile, label: 'File New Case', href: '#' },
              { icon: FaQuestion, label: 'Legal Resources', href: '#' },
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

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Active Cases</h3>
            <p className="text-3xl font-bold text-blue-600">{casesCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Next Hearing</h3>
            <p className="text-xl font-bold text-blue-600">Dec 15, 2023</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Pending Documents</h3>
            <p className="text-3xl font-bold text-orange-600">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Subscription</h3>
            <p className="text-xl font-bold text-green-600">Premium</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
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

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100">
                <FaFile className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <span className="text-sm">Upload Document</span>
              </button>
              <button className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100">
                <FaCalendarAlt className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <span className="text-sm">Schedule Meeting</span>
              </button>
              <button className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100">
                <FaMoneyBillWave className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <span className="text-sm">Make Payment</span>
              </button>
              <button className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100">
                <FaComments className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <span className="text-sm">Contact Lawyer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from 'react'
import { 
  FaUserTie, FaUserFriends, FaBullhorn, FaRobot, FaGavel, FaHome,
  FaFileAlt, FaCalendarAlt, FaMoneyBillWave, FaChartBar,
  FaCog, FaBell, FaUsers, FaClipboardList
} from 'react-icons/fa'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddLawyerForm from '@/components/forms/lawyer/add-lawyer'
import AddAssistantForm from '@/components/forms/assistant/add-assistant'
import { LawyersDataTable } from '@/components/tables/lawyers-table'
import { AssistantsDataTable } from '@/components/tables/assistants-table'
import { CasesDataTable } from '@/components/tables/cases-table'
import { lawyersCountAssociatedChamber,assistantCountAssociatedChamber,totalActiveCases } from '@/lib/actions/lawyer.actions'

import {getUserDetailsByUserId} from '@/lib/appointments/appointment'
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
  const [activeView, setActiveView] = useState<'home' | 'lawyers' | 'assistants' | 'announcements' | 'chatbot' | 'cases' | 'reports' | 'calendar' | 'documents'>('home')
  const [lawyerCount, setLawyerCount] = useState(0);
  const [assistantCount, setAssistantCount] = useState(0);
  const [casesCount, setCasesCount] = useState(0);
  getUserDetailsByUserId()
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
        <div className="p-6 bg-indigo-600">
          <h2 className="text-2xl font-bold text-white">Chamber Dashboard</h2>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="px-4 space-y-3 py-6">
            <button 
              onClick={resetView}
              className={`flex w-full items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200 ${
                activeView === 'home' ? 'bg-indigo-100 ring-2 ring-indigo-600' : ''
              }`}
            >
              <FaHome className="w-5 h-5 mr-3 text-indigo-600" />
              <span className="text-sm font-medium">Dashboard Home</span>
            </button>

            {/* Staff Management Section */}
            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase">Staff Management</p>
              <div className="mt-3 space-y-2">
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
              </div>
            </div>

            {/* Cases & Operations */}
            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase">Cases & Operations</p>
              <div className="mt-3 space-y-2">
                {[
                  { icon: FaGavel, label: 'Manage Cases', view: 'cases', onClick: () => handleNavigation('cases') },
                  { icon: FaCalendarAlt, label: 'Court Calendar', view: 'calendar', onClick: () => setActiveView('calendar') },
                  { icon: FaFileAlt, label: 'Documents', view: 'documents', onClick: () => setActiveView('documents') },
                  { icon: FaClipboardList, label: 'Case Reports', view: 'reports', onClick: () => setActiveView('reports') },
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
            </div>

            {/* Administration */}
            <div className="pt-4">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase">Administration</p>
              <div className="mt-3 space-y-2">
                {[
                  { icon: FaUsers, label: 'Team Management', view: 'team' },
                  { icon: FaMoneyBillWave, label: 'Billing', view: 'billing' },
                  { icon: FaChartBar, label: 'Analytics', view: 'analytics' },
                  { icon: FaBell, label: 'Notifications', view: 'notifications' },
                  { icon: FaBullhorn, label: 'Announcements', view: 'announcements' },
                  { icon: FaRobot, label: 'AI Assistant', view: 'chatbot' },
                  { icon: FaCog, label: 'Settings', view: 'settings' },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveView(item.view as any)}
                    className={`flex w-full items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200 ${
                      activeView === item.view ? 'bg-indigo-100 ring-2 ring-indigo-600' : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3 text-indigo-600" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {showLawyersTable ? 'Manage Lawyers' 
              : showAssistantsTable ? 'Manage Assistants' 
              : showCasesTable ? 'Manage Cases'
              : `Welcome, ${userName}`}
          </h1>
          {!showLawyersTable && !showAssistantsTable && !showCasesTable && (
            <p className="text-gray-600">Chamber ID: {userId}</p>
          )}
        </header>
        
        {showLawyersTable ? (
          <LawyersDataTable />
        ) : showAssistantsTable ? (
          <AssistantsDataTable />
        ) : showCasesTable ? (
          <CasesDataTable />
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Total Lawyers</h3>
              <p className="text-3xl font-bold text-indigo-600">{lawyerCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Total Assistants</h3>
              <p className="text-3xl font-bold text-indigo-600">{assistantCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Active Cases</h3>
              <p className="text-3xl font-bold text-indigo-600">{casesCount}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
// Updated import path for TemplateList
import TemplateList from "@/components/tables/TemplateList";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const templateCategories = [
    { id: "agreements", name: "Agreements" },
    { id: "clauses", name: "Clauses" },
    { id: "company", name: "Company Secretary" },
    { id: "emails", name: "Emails" },
    { id: "general", name: "General" },
    { id: "research", name: "Legal Research" },
    { id: "letters", name: "Letters" },
    { id: "forms", name: "Forms" },
    { id: "guides", name: "Guides" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm  ">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Legal Document and Review Templates
              </h1>
              <p className="mt-3 text-base md:text-lg text-gray-600">
                Our team of lawyers have pre-defined legal templates to generate your law content within seconds.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === "all"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Templates
              </button>
              {templateCategories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === category.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="mt-6">
              <TemplateGrid
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
              />
            </div>
          </div>
        </div>
      </div> */}
      <h3>Nouman</h3>
      {/* <TemplateList /> */}
    </div>
  )
}


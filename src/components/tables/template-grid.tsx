"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import { templates } from "@/data/templates"

interface TemplateGridProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  searchTerm: string
  onSearch: (term: string) => void
}

const getCategoryColor = (category: string) => {
  const colors = {
    agreements: "blue",
    clauses: "purple",
    company: "indigo",
    emails: "green",
    general: "gray",
    research: "red",
    letters: "amber",
    forms: "emerald",
    guides: "cyan",
  }
  return colors[category as keyof typeof colors] || "blue"
}

const categoryStyles = {
  agreements: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    hover: "group-hover:text-blue-600"
  },
  clauses: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    hover: "group-hover:text-purple-600"
  },
  company: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    hover: "group-hover:text-indigo-600"
  },
  emails: {
    bg: "bg-green-50",
    text: "text-green-600",
    hover: "group-hover:text-green-600"
  },
  general: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    hover: "group-hover:text-gray-600"
  },
  research: {
    bg: "bg-red-50",
    text: "text-red-600",
    hover: "group-hover:text-red-600"
  },
  letters: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    hover: "group-hover:text-amber-600"
  },
  forms: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    hover: "group-hover:text-emerald-600"
  },
  guides: {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    hover: "group-hover:text-cyan-600"
  }
};

export default function TemplateGrid({ activeTab, setActiveTab, searchTerm, onSearch }: TemplateGridProps) {
  const router = useRouter()
  const [filteredTemplates, setFilteredTemplates] = useState(templates)
  const [searchValue, setSearchValue] = useState(searchTerm)

  useEffect(() => {
    if (searchTerm) {
      setFilteredTemplates(
        templates.filter(
          (template) =>
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    } else if (activeTab !== "all") {
      setFilteredTemplates(templates.filter((template) => template.category === activeTab))
    } else {
      setFilteredTemplates(templates)
    }
  }, [searchTerm, activeTab])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchValue)
  }

  const toggleFavorite = (id: string) => {
    console.log(`Toggle favorite for template ${id}`)
  }

  const handleTemplateClick = (templateId: string) => {
    router.push(`/templates?id=${templateId}`)
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="max-w-md mb-8">
        <Input
          type="search"
          placeholder="Search templates..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 
                     transition-all duration-200 rounded-lg px-4 py-3 text-gray-700"
        />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template, index) => {
          const styles = categoryStyles[template.category as keyof typeof categoryStyles] || categoryStyles.general;
          
          return (
            <Card
              key={index}
              onClick={() => handleTemplateClick(template.id)}
              className="group hover:shadow-lg transition-all duration-300 border border-gray-100 
                       hover:border-blue-100 bg-white rounded-xl overflow-hidden cursor-pointer
                       hover:scale-105 active:scale-100"
            >
              <CardContent className="p-6">
                <div className="relative">
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className="absolute right-0 top-0 p-2 opacity-0 group-hover:opacity-100 
                             transition-opacity duration-200"
                    aria-label={template.favorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star 
                      className={`w-5 h-5 ${
                        template.favorite 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                    />
                  </button>

                  <div className="text-center space-y-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${styles.bg}`}>
                      <i className={`${template.icon} text-xl ${styles.text}`} aria-hidden="true"></i>
                    </div>
                    
                    <h3 className={`font-semibold text-gray-900 ${styles.hover} transition-colors duration-200`}>
                      {template.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {template.description}
                    </p>

                    <div className="flex justify-center gap-2 pt-2">
                      {template.isPro && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs 
                                     font-medium bg-amber-100 text-amber-700">
                          <i className="fa-sharp fa-solid fa-crown mr-1"></i>
                          Pro
                        </span>
                      )}
                      {template.isFree && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs 
                                     font-medium bg-green-100 text-green-700">
                          <i className="fa-sharp fa-solid fa-gift mr-1"></i>
                          Free
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  )
}


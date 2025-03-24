'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { templates } from '@/data/templates'

export default function TemplateQuestions() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get('id')

  const selectedTemplate = templates.find((template) => template.id === templateId)

  const [formData, setFormData] = useState(
    selectedTemplate?.questions?.reduce((acc, question) => {
      acc[question] = ''
      return acc
    }, {} as Record<string, string>) || {}
  )

  const handleInputChange = (question: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [question]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    // Add logic to process the form data
  }

  if (!selectedTemplate) {
    return <div className="text-center text-gray-600">Template not found.</div>
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-800">{selectedTemplate.title}</h1>
        <p className="text-gray-600 mt-2">{selectedTemplate.description}</p>
        <p className="text-sm text-gray-500 mt-1">Your Balance is 1,500 Words</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Language Dropdown */}
          <div>
            <label className="text-gray-700 font-medium">Language</label>
            <select
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English (USA)</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          {/* Questions */}
          {selectedTemplate.questions?.map((question, index) => (
            <div key={index}>
              <label className="text-gray-700 font-medium">{question}</label>
              <textarea
                value={formData[question]}
                onChange={(e) => handleInputChange(question, e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${question.toLowerCase()}`}
                rows={3}
              />
            </div>
          ))}

          {/* Additional Options */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium">Creativity</label>
              <select
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 font-medium">Tone of Voice</label>
              <select
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 font-medium">Number of Results</label>
              <select
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 font-medium">Max Result Length</label>
              <input
                type="number"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="4000"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Generate Text
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-800">New Document</h2>
        <div className="mt-4">
          <label className="text-gray-700 font-medium">Select Workbook Name</label>
          <select
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="workbook1">Workbook 1</option>
            <option value="workbook2">Workbook 2</option>
          </select>
        </div>
      </div>
    </div>
  )
}
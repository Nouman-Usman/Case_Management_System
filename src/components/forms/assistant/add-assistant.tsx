"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Wand2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Inter } from 'next/font/google'
import { LawyersDataTable } from "@/components/tables/lawyers-table"
import { addUserToClerk } from '@/lib/actions/chamber.action'
import { databases, DATABASE_ID, ChamberAssociate } from "@/lib/appwrite.config"
import { ID } from "appwrite"
import getUserId from "@/utils/userId"

const inter = Inter({ subsets: ['latin'] })

export default function AddAssistantForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showTable, setShowTable] = useState(false)

  const generatePassword = () => {
    setIsGenerating(true)
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    let generatedPassword = ""; // Ensure minimum requirements
    for (let i = 4; i < 20; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(generatedPassword)
    setTimeout(() => setIsGenerating(false), 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      console.error("Email and password are required")
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      console.error("Invalid email format")
      return
    }
    try {
      setIsLoading(true)

      // Fetch the current chamber ID
      const associatedChamberId = await getUserId()
      if (!associatedChamberId) {
        throw new Error("Failed to fetch the current chamber ID")
      }

      // Prepare data for addUserToClerk
      const clerkData = {
        emailAddress: [email],
        password: password,
        type: "assistant",
      }

      // Add the assistant to Clerk
      const response = await addUserToClerk(clerkData.emailAddress[0], clerkData.password, clerkData.type)
      if (response && response.id) {
        const assistantId = response.id // Clerk-assigned ID for the assistant
        console.log("Assistant added to Clerk:", assistantId)

        // Store the assistant's data in Appwrite
        const appwriteResponse = await databases.createDocument(
          DATABASE_ID,
          ChamberAssociate, // Collection ID for associated chamber data
          ID.unique(), // Generate a unique ID for the document
          {
            chamberId: associatedChamberId,
            role: clerkData.type,
            associateId: assistantId,
          }
        )
        console.log("Assistant data stored in Appwrite:", appwriteResponse)

        // Reset form
        setEmail("")
        setPassword("")
      }
    } catch (error: any) {
      console.error("Error adding assistant:", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (showTable) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${inter.className}`}>Manage Lawyers</h2>
          <Button onClick={() => setShowTable(false)} variant="outline">
            Back to Form
          </Button>
        </div>
        <LawyersDataTable />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className={`w-full max-w-md mx-auto transition-all duration-300 hover:shadow-lg ${inter.className}`}>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold tracking-tight">Add New Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="assistant@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={generatePassword}
                  className={cn(
                    "transition-all duration-300"
                  )}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full transition-all duration-300 hover:scale-[1.02] font-medium tracking-wide"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Assistant"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="text-center">
        <Button 
          variant="link" 
          onClick={() => setShowTable(true)}
          className="text-muted-foreground hover:text-primary"
        >
          Manage Lawyers →
        </Button>
      </div>
    </div>
  )
}

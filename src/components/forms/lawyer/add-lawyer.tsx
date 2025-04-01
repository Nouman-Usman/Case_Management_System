"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { addUserToClerk } from "@/lib/actions/chamber.action";
import { databases, DATABASE_ID, ChamberAssociate } from "@/lib/appwrite.config";
import { ID } from "appwrite";
import getUserId from "@/utils/userId";

export default function AddLawyerForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let generatedPassword = "A1b@"; // Ensure minimum requirements
    for (let i = 4; i < 20; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generatedPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      console.error("Invalid email format");
      return;
    }
    try {
      setIsLoading(true);
      const associatedChamberId = await getUserId();
      if (!associatedChamberId) {
        throw new Error("Failed to fetch the current chamber ID");
      }

      const clerkData = {
        emailAddress: [email],
        password: password,
        type: "lawyer",
      };

      const response = await addUserToClerk(clerkData.emailAddress[0], clerkData.password, clerkData.type);
      if (response && response.id) {
        const lawyerId = response.id; // Now a string from the plain object
        console.log("Lawyer added to Clerk:", lawyerId);

        const appwriteResponse = await databases.createDocument(
          DATABASE_ID,
          ChamberAssociate,
          ID.unique(),
          {
            chamberId: associatedChamberId,
            role: clerkData.type,
            associateId: lawyerId,
          }
        );
        console.log("Lawyer data stored in Appwrite:", appwriteResponse);

        setEmail("");
        setPassword("");
      }
    } catch (error: any) {
      console.error("Error adding lawyer:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Lawyer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="lawyer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex gap-2">
              <Input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="button" variant="outline" onClick={generatePassword}>
                Generate
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding Lawyer..." : "Add Lawyer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
"use client";

import { useState } from "react";
import { registerLawyer } from "@/backend/registrations/assistant_registration";
import type { AssistantProfile } from "@/types/index.d.ts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AssistantRegistrationForm = () => {
  const [assistantProfile, setAssistantProfile] = useState<AssistantProfile>({
    userId: "",
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    associatedChamberId: "",
    casesAssisted: [], // Array of case IDs
    profilePic: "",
    pern: [], // Array of roles
    verificationStatus: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssistantProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof AssistantProfile) => {
    const { value } = e.target;
    setAssistantProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerLawyer(assistantProfile);
      console.log("Assistant registered:", response);
    } catch (error) {
      console.error("Error registering assistant:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={assistantProfile.email}
        onChange={handleChange}
        required
      />

      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        value={assistantProfile.name}
        onChange={handleChange}
        required
      />

      <Label htmlFor="phone">Phone</Label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        value={assistantProfile.phone}
        onChange={handleChange}
        required
      />

      <Label htmlFor="address">Address</Label>
      <Input
        id="address"
        name="address"
        type="text"
        value={assistantProfile.address}
        onChange={handleChange}
        required
      />

      <Label htmlFor="city">City</Label>
      <Input
        id="city"
        name="city"
        type="text"
        value={assistantProfile.city}
        onChange={handleChange}
        required
      />

      <Label htmlFor="state">State</Label>
      <Input
        id="state"
        name="state"
        type="text"
        value={assistantProfile.state}
        onChange={handleChange}
        required
      />

      <Label htmlFor="zip">Zip</Label>
      <Input
        id="zip"
        name="zip"
        type="text"
        value={assistantProfile.zip}
        onChange={handleChange}
        required
      />

      <Label htmlFor="country">Country</Label>
      <Input
        id="country"
        name="country"
        type="text"
        value={assistantProfile.country}
        onChange={handleChange}
        required
      />

      <Label htmlFor="casesAssisted">Cases Assisted (comma separated)</Label>
      <Input
        id="casesAssisted"
        name="casesAssisted"
        type="text"
        value={assistantProfile.casesAssisted.join(", ")}
        onChange={(e) => handleArrayChange(e, "casesAssisted")}
        required
      />

      <Label htmlFor="pern">Roles (comma separated)</Label>
      <Input
        id="pern"
        name="pern"
        type="text"
        value={assistantProfile.pern.join(", ")}
        onChange={(e) => handleArrayChange(e, "pern")}
        required
      />

      <Label htmlFor="profilePic">Profile Picture URL</Label>
      <Input
        id="profilePic"
        name="profilePic"
        type="text"
        value={assistantProfile.profilePic}
        onChange={handleChange}
        required
      />

      <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register Assistant
      </Button>
    </form>
  );
};

export default AssistantRegistrationForm;
"use client";

import { useState } from "react";
import { registerClient } from "@/backend/registrations/client_registration";
import type { ClientProfile } from "@/types/index.d.ts";
import { Button} from "@/components/ui/button";
import { Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ClientRegistrationForm = () => {
  const [clientProfile, setClientProfile] = useState<ClientProfile>({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    casesInvolved: [],
    profilePic: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerClient(clientProfile);
      console.log("Client registered:", response);
    } catch (error) {
      console.error("Error registering client:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={clientProfile.email}
        onChange={handleChange}
        required
      />

      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        value={clientProfile.name}
        onChange={handleChange}
        required
      />

      <Label htmlFor="phone">Phone</Label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        value={clientProfile.phone}
        onChange={handleChange}
        required
      />

      <Label htmlFor="address">Address</Label>
      <Input
        id="address"
        name="address"
        type="text"
        value={clientProfile.address}
        onChange={handleChange}
        required
      />

      <Label htmlFor="city">City</Label>
      <Input
        id="city"
        name="city"
        type="text"
        value={clientProfile.city}
        onChange={handleChange}
        required
      />

      <Label htmlFor="state">State</Label>
      <Input
        id="state"
        name="state"
        type="text"
        value={clientProfile.state}
        onChange={handleChange}
        required
      />

      <Label htmlFor="zip">Zip</Label>
      <Input
        id="zip"
        name="zip"
        type="text"
        value={clientProfile.zip}
        onChange={handleChange}
        required
      />

      <Label htmlFor="country">Country</Label>
      <Input
        id="country"
        name="country"
        type="text"
        value={clientProfile.country}
        onChange={handleChange}
        required
      />

      <Label htmlFor="casesInvolved">Cases Involved (comma separated)</Label>
      <Input
        id="casesInvolved"
        name="casesInvolved"
        type="text"
        value={clientProfile.casesInvolved.join(", ")}
        onChange={(e) => setClientProfile((prevProfile) => ({
          ...prevProfile,
          casesInvolved: e.target.value.split(", ").map(caseId => caseId.trim()),
        }))}
        required
      />

      <Label htmlFor="profilePic">Profile Picture URL</Label>
      <Input
        id="profilePic"
        name="profilePic"
        type="text"
        value={clientProfile.profilePic}
        onChange={handleChange}
        required
      />

      <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register Client
      </Button>
    </form>
  );
};

export default ClientRegistrationForm;
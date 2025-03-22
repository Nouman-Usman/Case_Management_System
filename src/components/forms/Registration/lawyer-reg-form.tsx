"use client";

import { useState } from "react";
import { registerLawyer } from "@/backend/registrations/lawyer_registration";
import type { LawyerProfile } from "@/types/index.d.ts";
import { Button} from "@/components/ui/button";
import { Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LawyerRegistrationForm = () => {
  const [lawyerProfile, setLawyerProfile] = useState<LawyerProfile>({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    barCouncilNumber: "",
    barLicenseUrl: "",
    associatedChamberId: "",
    practiceAreas: [], // Array of practice areas
    experience: "", //not required
    education: "",  //not required
    languages: [], //not required
    consultationFees: 0,
    rating: 0,
    reviews: [], 
    casesHandled: 0, // not required
    casesWon: 0, // not required
    casesLost: 0, // not required
    profilePic: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLawyerProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerLawyer(lawyerProfile);
      console.log("Lawyer registered:", response);
    } catch (error) {
      console.error("Error registering lawyer:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={lawyerProfile.email}
        onChange={handleChange}
        required
      />

      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        value={lawyerProfile.name}
        onChange={handleChange}
        required
      />

      <Label htmlFor="phone">Phone</Label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        value={lawyerProfile.phone}
        onChange={handleChange}
        required
      />

      <Label htmlFor="address">Address</Label>
      <Input
        id="address"
        name="address"
        type="text"
        value={lawyerProfile.address}
        onChange={handleChange}
        required
      />

      <Label htmlFor="city">City</Label>
      <Input
        id="city"
        name="city"
        type="text"
        value={lawyerProfile.city}
        onChange={handleChange}
        required
      />

      <Label htmlFor="state">State</Label>
      <Input
        id="state"
        name="state"
        type="text"
        value={lawyerProfile.state}
        onChange={handleChange}
        required
      />

      <Label htmlFor="zip">Zip</Label>
      <Input
        id="zip"
        name="zip"
        type="text"
        value={lawyerProfile.zip}
        onChange={handleChange}
        required
      />

      <Label htmlFor="country">Country</Label>
      <Input
        id="country"
        name="country"
        type="text"
        value={lawyerProfile.country}
        onChange={handleChange}
        required
      />

      <Label htmlFor="practiceAreas">Practice Areas (comma separated)</Label>
      <Input
        id="practiceAreas"
        name="practiceAreas"
        type="text"
        value={lawyerProfile.practiceAreas.join(", ")}
        onChange={(e) => setLawyerProfile((prevProfile) => ({
          ...prevProfile,
          practiceAreas: e.target.value.split(", ").map(area => area.trim()),
        }))}
        required
      />

      <Label htmlFor="experience">Experience</Label>
      <Input
        id="experience"
        name="experience"
        type="text"
        value={lawyerProfile.experience}
        onChange={handleChange}
        required
      />

      <Label htmlFor="education">Education</Label>
      <Input
        id="education"
        name="education"
        type="text"
        value={lawyerProfile.education}
        onChange={handleChange}
        required
      />

      <Label htmlFor="languages">Languages (comma separated)</Label>
      <Input
        id="languages"
        name="languages"
        type="text"
        value={lawyerProfile.languages.join(", ")}
        onChange={(e) => setLawyerProfile((prevProfile) => ({
          ...prevProfile,
          languages: e.target.value.split(", ").map(lang => lang.trim()),
        }))}
        required
      />

      <Label htmlFor="consultationFees">Consultation Fees</Label>
      <Input
        id="consultationFees"
        name="consultationFees"
        type="number"
        value={lawyerProfile.consultationFees}
        onChange={handleChange}
        required
      />

      <Label htmlFor="rating">Rating</Label>
      <Input
        id="rating"
        name="rating"
        type="number"
        value={lawyerProfile.rating}
        onChange={handleChange}
        required
      />

      <Label htmlFor="reviews">Reviews (comma separated)</Label>
      <Input
        id="reviews"
        name="reviews"
        type="text"
        value={lawyerProfile.reviews.join(", ")}
        onChange={(e) => setLawyerProfile((prevProfile) => ({
          ...prevProfile,
          reviews: e.target.value.split(", ").map(review => review.trim()),
        }))}
        required
      />

      <Label htmlFor="casesHandled">Cases Handled</Label>
      <Input
        id="casesHandled"
        name="casesHandled"
        type="number"
        value={lawyerProfile.casesHandled}
        onChange={handleChange}
        required
      />

      <Label htmlFor="casesWon">Cases Won</Label>
      <Input
        id="casesWon"
        name="casesWon"
        type="number"
        value={lawyerProfile.casesWon}
        onChange={handleChange}
        required
      />

      <Label htmlFor="casesLost">Cases Lost</Label>
      <Input
        id="casesLost"
        name="casesLost"
        type="number"
        value={lawyerProfile.casesLost}
        onChange={handleChange}
        required
      />

      <Label htmlFor="profilePic">Profile Picture URL</Label>
      <Input
        id="profilePic"
        name="profilePic"
        type="text"
        value={lawyerProfile.profilePic}
        onChange={handleChange}
        required
      />

      <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register Lawyer
      </Button>
    </form>
  );
};

export default LawyerRegistrationForm;
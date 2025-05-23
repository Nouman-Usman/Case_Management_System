import { databases, DATABASE_ID } from "@/lib/appwrite.config";
import type { LawyerProfile } from "@/types/index.d.ts";
import {LawyerProfile_ID} from "@/lib/appwrite.config";

// pass an object of type LawyerProfile
export const registerLawyer = async (lawyerProfile: LawyerProfile) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      LawyerProfile_ID, // Collection ID for LawyerProfile
      'unique()', // Generate a unique ID for the document
      lawyerProfile
    );

    console.log("Lawyer registered successfully:", response);
    return response;
  } catch (error) {
    console.error("Error registering lawyer:", error);
    throw error;
  }
};
import { databases, DATABASE_ID } from "@/lib/appwrite.config";
import type { AssistantProfile } from "@/types/index.d.ts";
import {ASSISTANTPROFILE_ID} from "@/lib/appwrite.config";

// pass an object of type LawyerProfile
export const registerLawyer = async (assistantProfile: AssistantProfile) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      ASSISTANTPROFILE_ID, // Collection ID for assistantProfile
      'unique()', // Generate a unique ID for the document
      assistantProfile
    );

    console.log("assistantProfile registered successfully:", response);
    return response;
  } catch (error) {
    console.error("Error registering assistantProfile:", error);
    throw error;
  }
};
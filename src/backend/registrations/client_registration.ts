import { databases, DATABASE_ID } from "@/lib/appwrite.config";
import type { ClientProfile } from "@/types/index.d.ts";

const CLIENT_COLLECTION_ID = process.env.NEXT_PUBLIC_CLIENT_COLLECTION_ID!;

export const registerClient = async (clientProfile: ClientProfile) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      CLIENT_COLLECTION_ID,
      'unique()', // Generate a unique ID for the document
      clientProfile
    );

    console.log("Client registered successfully:", response);
    return response;
  } catch (error) {
    console.error("Error registering client:", error);
    throw error;
  }
};
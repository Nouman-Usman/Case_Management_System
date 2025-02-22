import { account, databases, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite.config";
import type {CreateUserParams} from '@/types/index.d.ts' // Ensure this file exists or update the path


export const signup = async ({ email, password, phone }: CreateUserParams) => {
  try {
    // Create user in Appwrite authentication system
    const user = await account.create('unique()', email, password);

    // Create document in the database with additional user details
    const userId = user.$id;
    const userDocument = await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      userId, // Use the Appwrite user ID as the document ID
      {
        email,
        phone,
      }
    );

    console.log("User created successfully:", userDocument);
    return userDocument;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
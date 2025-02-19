import { databases, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite.config";

export const updateUserRole = async (userId: string, role: "user" | "chamber") => {
  try {
    const updatedUser = await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      userId,
      {
        role,
      }
    );

    console.log("User role updated successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};
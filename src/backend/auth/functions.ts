import { account, users } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";

export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const sessions = await account.listSessions();
    if (sessions.sessions.length > 0) {
      const userId = sessions.sessions[0].userId;
      console.log("Current user ID:", userId);
      return parseStringify(userId);
    } else {
      console.log("No active session found.");
      return null;
    }
  } catch (error) {
    console.error("Error getting current user ID:", error);
    return null;
  }
};

export const getUser = async (userId: string): Promise<Record<string, unknown>> => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};
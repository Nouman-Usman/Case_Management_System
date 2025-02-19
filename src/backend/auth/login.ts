import { account } from "@/lib/appwrite.config";

export const login = async (email: string, password: string) => {
  try {
    // Check if a session already exists
    const sessions = await account.listSessions(); // Corrected method
    if (sessions.sessions.length > 0) {
      console.log("Session already exists:", sessions.sessions[0]);
      return sessions.sessions[0];
    }

    // Create a new session if no session exists
    const session = await account.createEmailPasswordSession(email, password); // Corrected method
    console.log("Session created successfully:", session);
    return session;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

import { account } from "@/lib/appwrite.config";

export const resetPassword = async (userId: string, secret: string, newPassword: string) => {
  try {
    const response = await account.updateRecovery(userId, secret, newPassword);
    console.log("Password reset successfully:", response);
    return response;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
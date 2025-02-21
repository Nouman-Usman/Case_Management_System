import { account } from "@/lib/appwrite.config";

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await account.createRecovery(email, 'https://your-app.com/reset-password');
    console.log("Password reset email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};
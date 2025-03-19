import getUserId from "../../utils/userId";
import { LawyerProfile_ID, databases, DATABASE_ID } from "../appwrite.config";
import { Query } from "appwrite";


async function lawyersCountAssociatedChamber(): Promise<number> {
    try {
        // Validate imported constants
        if (!DATABASE_ID || !LawyerProfile_ID) {
            throw new Error("Database ID or Lawyer Profile ID is not defined in configuration");
        }

        const chamberId = await getUserId();

        if (!chamberId) {
            throw new Error("Chamber ID not found");
        }


        const response = await databases.listDocuments(
            DATABASE_ID,
            LawyerProfile_ID,
            [Query.equal("associatedChamberId", chamberId)]
        );
        console.log(response.documents.length)
        return response.documents.length;
    } catch (error) {
        console.error('Error counting lawyers:', error instanceof Error ? error.message : String(error));
        throw error instanceof Error ? error : new Error('Failed to count lawyers');
    }
}

export { lawyersCountAssociatedChamber };
import getUserId from "../../utils/userId";
import { LawyerProfile_ID, databases, DATABASE_ID, ASSISTANTPROFILE_ID,CASE_ID } from "../appwrite.config";
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

async function assistantCountAssociatedChamber(): Promise<number> {
    try {
        // Validate imported constants
        if (!DATABASE_ID || !ASSISTANTPROFILE_ID) {
            throw new Error("Database ID or ASSISTANT Profile ID is not defined in configuration");
        }

        const chamberId = await getUserId();

        if (!chamberId) {
            throw new Error("Chamber ID not found");
        }


        const response = await databases.listDocuments(
            DATABASE_ID,
            ASSISTANTPROFILE_ID,
            [Query.equal("associatedChamberId", chamberId)]
        );
        console.log(response.documents.length)
        return response.documents.length;
    } catch (error) {
        console.error('Error counting assistants:', error instanceof Error ? error.message : String(error));
        throw error instanceof Error ? error : new Error('Failed to count assistants');
    }
}

async function totalActiveCases(): Promise<number> {
    try {
        // Validate imported constants
        if (!DATABASE_ID || !CASE_ID) {
            throw new Error("Database ID or CASE_ID is not defined in configuration");
        }

        const chamberId = await getUserId();
        if (!chamberId) {
            throw new Error("Chamber ID not found");
        }

        // Query for documents where associatedChamberId matches and casesStatus is "active"
        const response = await databases.listDocuments(
            DATABASE_ID,
            CASE_ID,
            [
                Query.equal("chamberId", chamberId),
                Query.equal("caseStatus", "active")
            ]
        );

        console.log("Total active cases:", response.documents.length);
        return response.documents.length;
    } catch (error) {
        console.error("Error counting active cases:", error instanceof Error ? error.message : String(error));
        throw error instanceof Error ? error : new Error("Failed to count active cases");
    }
}


export { lawyersCountAssociatedChamber,assistantCountAssociatedChamber,totalActiveCases };
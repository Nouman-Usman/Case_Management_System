import getUserId from "../../utils/userId";
import { databases, DATABASE_ID,CASE_ID } from "../appwrite.config";
import { Query } from "appwrite";


async function totalActiveCases(): Promise<number> {
    try {
        // Validate imported constants
        if (!DATABASE_ID || !CASE_ID) {
            throw new Error("Database ID or CASE_ID is not defined in configuration");
        }

        const userid = await getUserId();
        if (!userid) {
            throw new Error("Client ID not found");
        }

        // Query for documents where clientId matches and casesStatus is "active"
        const response = await databases.listDocuments(
            DATABASE_ID,
            CASE_ID,
            [
                Query.equal("userId", userid),
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

export { totalActiveCases };
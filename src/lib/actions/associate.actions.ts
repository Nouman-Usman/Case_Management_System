import { databases, DATABASE_ID, ChamberAssociate } from "@/lib/appwrite.config";
import { Query } from "appwrite";

export async function getChamberDetailsByAssociateId(associateId: string): Promise<{ chamberId: string; role: string } | null> {
    try {
        // Query the associatedChamber collection using the associateId
        const response = await databases.listDocuments(
            DATABASE_ID,
            ChamberAssociate,
            [Query.equal("associateId", associateId)]
        );

        if (response.documents.length === 0) {
            console.error("No matching document found for the given associateId");
            return null;
        }

        // Extract the chamberId and role from the first matching document
        const { chamberId, role } = response.documents[0];
        return { chamberId, role };
    } catch (error) {
        console.error("Error fetching chamber details by associateId:", error);
        throw error;
    }
}

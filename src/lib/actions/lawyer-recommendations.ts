import { databases, DATABASE_ID, LawyerProfile_ID } from "@/lib/appwrite.config";
import { Query } from "appwrite";
import type { LawyerProfile } from "@/types/index.d.ts";

// Function to get all lawyers from the database
export async function getAllLawyers(): Promise<LawyerProfile[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      LawyerProfile_ID,
      [Query.equal("verificationStatus", "approved")]
    );
    
    return response.documents.map(doc => doc as unknown as LawyerProfile);
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    return [];
  }
}

// Interface for filtering lawyers
export interface LawyerFilters {
  practiceArea?: string;
  minExperience?: number;
  maxFees?: number;
  minRating?: number;
  location?: string;
  language?: string;
}

// Function to filter lawyers based on criteria
export async function getFilteredLawyers(filters: LawyerFilters): Promise<LawyerProfile[]> {
  try {
    // Start with basic query that only gets verified lawyers
    const queryParams = [Query.equal("verificationStatus", "approved")];
    
    // Add filters if they exist
    if (filters.minRating) {
      queryParams.push(Query.greaterThanEqual("rating", filters.minRating));
    }
    
    if (filters.maxFees) {
      queryParams.push(Query.lessThanEqual("consultationFees", filters.maxFees));
    }
    
    // For location (city or state or country)
    if (filters.location) {
      // Try to match any location field
      queryParams.push(Query.or([
        Query.equal("city", filters.location),
        Query.equal("state", filters.location),
        Query.equal("country", filters.location)
      ]));
    }
    
    const response = await databases.listDocuments(
      DATABASE_ID,
      LawyerProfile_ID,
      queryParams
    );
    
    let lawyers = response.documents.map(doc => doc as unknown as LawyerProfile);
    
    // Some filters need to be applied after fetching data
    // because Appwrite doesn't support array contains or numeric conversions directly
    
    // Filter by practice area
    if (filters.practiceArea) {
      lawyers = lawyers.filter(lawyer => 
        lawyer.practiceAreas.some(area => 
          area.toLowerCase().includes(filters.practiceArea!.toLowerCase())
        )
      );
    }
    
    // Filter by experience (need to convert string to number)
    if (filters.minExperience) {
      lawyers = lawyers.filter(lawyer => {
        // Extract years from experience field, assuming format like "10 years"
        const years = parseInt(lawyer.experience);
        return !isNaN(years) && years >= filters.minExperience!;
      });
    }
    
    // Filter by language
    if (filters.language) {
      lawyers = lawyers.filter(lawyer => 
        lawyer.languages.some(lang => 
          lang.toLowerCase().includes(filters.language!.toLowerCase())
        )
      );
    }
    
    return lawyers;
  } catch (error) {
    console.error("Error fetching filtered lawyers:", error);
    return [];
  }
}

// Function to get top rated lawyers (simple recommendation)
export async function getRecommendedLawyers(limit: number = 5): Promise<LawyerProfile[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      LawyerProfile_ID,
      [
        Query.equal("verificationStatus", "approved"),
        Query.orderDesc("rating"),
        Query.limit(limit)
      ]
    );
    
    return response.documents.map(doc => doc as unknown as LawyerProfile);
  } catch (error) {
    console.error("Error fetching recommended lawyers:", error);
    return [];
  }
}
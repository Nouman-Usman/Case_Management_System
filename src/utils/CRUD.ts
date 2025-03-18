const { ID } = require('node-appwrite');
import { databases, DATABASE_ID } from "@/lib/appwrite.config";

/**
 * Create a new document in a specified collection.
 * For array fields, pass the array as JSON.stringify(arr).
 * For image fields, pass the string URL/base64.
 */
async function createData(collectionId: string, data: any): Promise<any> {
  try {
    // Use a unique ID or supply your own
    const response = await databases.createDocument(
      DATABASE_ID,
      collectionId,
      ID.unique(),
      { ...data }
    );
    console.log('Document created:', response);
    return response;
  } catch (error) {
    console.error('Create error:', error);
    throw error;
  }
}

/**
 * Read a document by its ID from a specific collection.
 */
async function readData(collectionId: string, documentId: string): Promise<any> {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      collectionId,
      documentId
    );
    console.log('Document read:', response);
    return response;
  } catch (error) {
    console.error('Read error:', error);
    throw error;
  }
}

/**
 * Update a document by its ID in a specific collection.
 * For arrays, again serialize/deserialize as needed.
 */
async function updateData(collectionId: string, documentId: string, newData: any): Promise<any> {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      collectionId,
      documentId,
      { ...newData }
    );
    console.log('Document updated:', response);
    return response;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
}

/**
 * Delete a document by its ID from a specific collection.
 */
async function deleteData(collectionId: string, documentId: string): Promise<any> {
  try {
    const response = await databases.deleteDocument(
      DATABASE_ID,
      collectionId,
      documentId
    );
    console.log('Document deleted:', response);
    return response;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}

export {
  createData,
  readData,
  updateData,
  deleteData
};
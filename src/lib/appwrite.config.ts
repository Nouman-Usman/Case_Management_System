import * as sdk from "node-appwrite";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID!;
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT_URL!;
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const USER_COLLECTION_ID = process.env.NEXT_PUBLIC_USER_COLLECTION_ID!;
const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID!;
const client = new sdk.Client();
client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);
export const id = sdk.ID;
export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const storage = new sdk.Storage(client);
export const account = new sdk.Account(client);
export const functions = new sdk.Functions(client);
const ClientProfile_ID = process.env.NEXT_PUBLIC_CLIENT_PROFILE_COLLECTION_ID!;
const ChamberProfileID = process.env.NEXT_PUBLIC_CHAMBER_PROFILE_COLLECTION_ID!;
export { DATABASE_ID, USER_COLLECTION_ID, BUCKET_ID, ClientProfile_ID, ChamberProfileID };

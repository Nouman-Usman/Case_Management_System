import { Client, Storage, Databases, Account, ID } from "appwrite";
import * as sdk from "node-appwrite"
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT_URL || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID || '');

const sdkClient = new sdk.Client().setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT_URL || 'https://cloud.appwrite.io/v1')
.setProject(process.env.NEXT_PUBLIC_PROJECT_ID || '');
const storage = new Storage(client);
const databases = new Databases(client);
const account = new Account(client);
const db = new sdk.Databases(sdkClient);
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const USER_COLLECTION_ID = process.env.NEXT_PUBLIC_USER_COLLECTION_ID!;
const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID!;
const ClientProfile_ID = process.env.NEXT_PUBLIC_CLIENT_PROFILE_COLLECTION_ID!;
const LawyerProfile_ID = process.env.NEXT_PUBLIC_LAWYERPROFILE_ID!;
const CASE_ID = process.env.NEXT_PUBLIC_CASE_ID!;
const ASSISTANTPROFILE_ID = process.env.NEXT_PUBLIC_ASSISTANTPROFILE_ID!;
const ChamberProfileID = process.env.NEXT_PUBLIC_CHAMBER_PROFILE_COLLECTION_ID!;
const ChamberAssociate = process.env.NEXT_PUBLIC_CHAMBER_ASSOCIATE_ID!;

export {
    client,
    storage,
    databases,
    account,
    ID,
    DATABASE_ID,
    USER_COLLECTION_ID,
    BUCKET_ID,
    ClientProfile_ID,
    ChamberProfileID,
    LawyerProfile_ID,
    ASSISTANTPROFILE_ID,
    CASE_ID,
    db,
    ChamberAssociate
};
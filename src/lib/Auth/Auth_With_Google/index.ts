// import { Client, Account, Models } from "node-appwrite";
import { Client,OAuthProvider, Account } from "appwrite";
import {databases, users, messaging, storage, account} from "@/lib/appwrite.config";
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
const client = new Client()
    .setEndpoint(ENDPOINT!) // Your API Endpoint
    .setProject(PROJECT_ID!);                 // Your project ID

const client_account = new Account(client);

export const loginWithGoogle = async () => {
  try {    
    console.log("Logging in with Google");
    client_account.createOAuth2Session(
      OAuthProvider.Google, // provider
      'https://example.com/success', // redirect here on success
      'https://example.com/failed',
      ['email', 'profile'], // scopes
    );
  } catch (error) {
    console.error("An error occurred while logging in with Google:", error);
  }
};


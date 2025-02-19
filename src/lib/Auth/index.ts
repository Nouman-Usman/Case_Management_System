// "use server";
// // import { Client, Account, Models } from "node-appwrite";
// import { cookies } from "next/headers";
// import { ID, Query } from "node-appwrite";
// import { parseStringify } from "../utils";
// import { Client,OAuthProvider, Account } from "appwrite";
// import {databases, users, messaging, storage, account} from "@/lib/appwrite.config";
// const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
// const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
// const client = new Client()
//     .setEndpoint(ENDPOINT!) // Your API Endpoint
//     .setProject(PROJECT_ID!);                 // Your project ID

// const client_account = new Account(client);
// export async function createUser(user: CreateUserParams) {
//   console.log("Creating a new user:", user);
//   try {
//     const newuser = await users.create(
//       ID.unique(),
//       user.email,
//       user.phone,
//       user.password,
//       undefined,
//     );
//     return parseStringify(newuser);
//   } catch (error: any) {
//     // Check existing user
//     if (error && error?.code === 409) {
//       const existingUser = await users.list([
//         Query.equal("email", [user.email]),
//       ]);

//       return existingUser.users[0];
//     }
//     console.error("An error occurred while creating a new user:", error);
//   }  
// }
// export const getUser = async (userId: string) => {
//   try {
//     const user = await users.get(userId);

//     return parseStringify(user);
//   } catch (error) {
//     console.error(
//       "An error occurred while retrieving the user details:",
//       error
//     );
//   }
// };

// export const loginWithGoogle = async () => {
//   try {    
//     client_account.createOAuth2Session(
//       OAuthProvider.Google, // provider
//       'https://example.com/success', // redirect here on success
//       'https://example.com/failed',
//       ['email', 'profile'], // scopes
//     );
//   } catch (error) {
//     console.error("An error occurred while logging in with Google:", error);
//   }
// };


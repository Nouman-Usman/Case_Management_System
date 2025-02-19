// import * as sdk from "node-appwrite";
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
// const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
// const client = new sdk.Client();
// client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);
// export const databases = new sdk.Databases(client);
// export const users = new sdk.Users(client);
// export const messaging = new sdk.Messaging(client);
// export const storage = new sdk.Storage(client);
// export const account = new sdk.Account(client);


import { Client, Databases, Account } from "appwrite";

const PROJECT_ID = process.env.PROJECT_ID!;
const ENDPOINT = process.env.ENDPOINT_URL!;
const DATABASE_ID = process.env.DATABSE_ID!;
const USER_COLLECTION_ID = process.env.USER_ID!;

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, DATABASE_ID, USER_COLLECTION_ID };


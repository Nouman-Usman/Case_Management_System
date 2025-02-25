"use server"

import { currentUser } from "@clerk/nextjs/server";
import { parseStringify } from "@/lib/utils";

export default async function getData() {
    const user = await currentUser();
    return user?.username;
}
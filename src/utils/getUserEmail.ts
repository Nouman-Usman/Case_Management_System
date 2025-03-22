"use server"

import { currentUser } from "@clerk/nextjs/server";
import { parseStringify } from "@/lib/utils";


export default async function getUserEmail() {
    const user = await currentUser();
    const emailAddresses = user?.emailAddresses || [];
    return emailAddresses.length > 0 ? emailAddresses[0].emailAddress : null;
}

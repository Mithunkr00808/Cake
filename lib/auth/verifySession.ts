import { cookies } from "next/headers";
import { auth } from "@/lib/firebase-admin";

export async function verifySession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        // Verify the session cookie securely.
        // The checkRevoked flag (true) ensures the token wasn't revoked recently.
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        return decodedClaims;
    } catch (error) {
        // If verification fails (invalid signature, expired, etc.), return null
        console.error("Session cryptographic verification failed:", error);
        return null;
    }
}

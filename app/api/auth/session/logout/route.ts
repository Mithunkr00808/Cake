import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/firebase-admin";

export async function POST() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    const response = NextResponse.json({ success: true }, { status: 200 });

    // Revoke server-side session before clearing cookie
    // This prevents stolen cookies from being reused after logout
    if (sessionCookie) {
        try {
            const decoded = await auth.verifySessionCookie(sessionCookie);
            await auth.revokeRefreshTokens(decoded.uid);
        } catch (error) {
            // Session may already be invalid, proceed with cookie clear
        }
    }

    // Clear the session cookie
    response.cookies.set("session", "", {
        maxAge: -1,
        path: "/",
    });

    return response;
}

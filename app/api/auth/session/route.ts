import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase-admin";

export async function POST(request: Request) {
    try {
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: "No token provided" }, { status: 400 });
        }

        // Create a session cookie that expires in 5 days (in milliseconds)
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        
        // Verify the idToken first, then create the session cookie
        const decodedIdToken = await auth.verifyIdToken(idToken);
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

        const response = NextResponse.json({ success: true }, { status: 200 });

        // Set the cookie
        response.cookies.set("session", sessionCookie, {
            maxAge: expiresIn / 1000, // maxAge is in seconds
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        return response;
    } catch (error) {
        console.error("Session creation error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

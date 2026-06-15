import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';

export async function POST(request: Request) {
    try {
        const { email, secretKey } = await request.json();

        // Very important: Use a strong secret key from environment variables
        // If it's not set, deny everything to prevent accidental exposure.
        const expectedSecret = process.env.ADMIN_SETUP_SECRET;
        
        if (!expectedSecret || secretKey !== expectedSecret) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Find the user by email
        const user = await auth.getUserByEmail(email);

        // Set the admin custom claim
        await auth.setCustomUserClaims(user.uid, { admin: true });

        return NextResponse.json({ 
            success: true, 
            message: `Successfully granted admin privileges to ${email}` 
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error setting admin claim:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const sessionCookie = request.cookies.get('session')?.value;

    // We only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            // Since firebase-admin is a Node.js library and edge functions don't support all Node APIs,
            // verifying the token completely edge-side requires a REST API call to Google or sending it to a Next.js API route.
            // For simple middleware protection, we decode the JWT to check the email. 
            // Note: Decoding is NOT verifying. We must verify in the Server Actions/API routes.
            // But this is sufficient to stop unauthenticated UI flashes.
            const payloadBase64 = sessionCookie.split('.')[1];
            if (!payloadBase64) throw new Error("Invalid token format");
            
            const payloadStr = Buffer.from(payloadBase64, 'base64').toString('utf8');
            const payload = JSON.parse(payloadStr);

            // We decode the JWT here just to ensure it's a valid JSON format.
            // Actual cryptographic verification AND Custom Claim checks happen in Server Components.
            if (!payload.email) {
                return NextResponse.redirect(new URL('/login', request.url));
            }

            return NextResponse.next();
        } catch (error) {
            console.error("Middleware session verification error:", error);
            // If there's an error parsing the token, force login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};

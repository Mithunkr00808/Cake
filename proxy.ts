import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/lib/firebase-admin';

export async function proxy(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    const { pathname } = request.nextUrl;

    // Protected routes that require authentication
    const protectedRoutes = ['/my-account', '/order-confirmation', '/admin'];
    const isProtected = protectedRoutes.some(r => pathname.startsWith(r));

    if (isProtected) {
        if (!session) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        try {
            // Security: Cryptographically verify the session cookie, not just its existence
            await auth.verifySessionCookie(session, true);
        } catch {
            // Session is invalid, expired, or revoked — clear cookie and redirect
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            const response = NextResponse.redirect(loginUrl);
            response.cookies.set('session', '', { maxAge: -1, path: '/' });
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/my-account/:path*', '/admin/:path*', '/order-confirmation/:path*'],
};

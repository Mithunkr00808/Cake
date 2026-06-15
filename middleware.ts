import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    const { pathname } = request.nextUrl;

    // Protected routes that require authentication
    const protectedRoutes = ['/my-account', '/order-confirmation', '/admin'];
    const isProtected = protectedRoutes.some(r => pathname.startsWith(r));

    if (isProtected && !session) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/my-account/:path*', '/admin/:path*', '/order-confirmation/:path*'],
};

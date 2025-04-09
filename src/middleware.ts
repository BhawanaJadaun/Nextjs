import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  const isAuthPage =
    url.pathname.startsWith('/sign-in') ||
    url.pathname.startsWith('/sign-up') ||
    url.pathname.startsWith('/verify');

  const isRoot = url.pathname === '/';

  if (token && (isAuthPage || isRoot)) {
    // Logged in but accessing auth pages or root → redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    // Not logged in and accessing protected route → redirect to home or sign-in
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next(); // Allow all other routes
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
};

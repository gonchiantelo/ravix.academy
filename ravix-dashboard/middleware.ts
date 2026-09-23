import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('ravix_session');
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  if (!sessionCookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     *
     * NOTE: /api routes are intentionally included so that /api/tareas
     * is also protected by the session cookie check. Without this,
     * anyone could bypass the login and query the proxy directly.
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

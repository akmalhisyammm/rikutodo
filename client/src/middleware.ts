import { NextResponse, type NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get('jwt');

  if (!token || token.value === 'loggedOut') {
    if (req.nextUrl.pathname.startsWith('/home')) {
      return NextResponse.redirect(new URL('/auth/sign-in', req.nextUrl.origin));
    }

    return NextResponse.next();
  }

  if (req.nextUrl.pathname === '/' || req.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/home', req.nextUrl.origin));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|icons).*)'],
};

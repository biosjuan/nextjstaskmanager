import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const publicRoute =
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/register';

    const token = request.cookies.get('token')?.value;
    // if the token is present and the route is public redirect to home page
    if (token && publicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // if the token is not present and the route is public redirect to login page
    if (!token && !publicRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    NextResponse.next();
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export const config = {
  matcher: ['/login', '/register', '/', '/client_home'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value; 

  const url = request.nextUrl.clone();

  const rotas = ['/login', '/create']

  if (token && rotas.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && !rotas.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/create', '/perfil', '/monstros/:path*'],
};
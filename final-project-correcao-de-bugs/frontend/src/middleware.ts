import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value; 

  const url = request.nextUrl.clone();

  if (!token && url.pathname === '/') {
    // Redireciona ele obrigatoriamente para a tela de login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && (url.pathname === '/login' || url.pathname === '/cadastro')) {
    // Joga ele direto para a home, já que ele já está autenticado
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se estiver tudo certo, permite que a navegação continue normalmente
  return NextResponse.next();
}

export const config = {
  // Aqui dizemos para rodar na home e em qualquer sub-rota de monstros, mas ignorar arquivos estáticos e a API
  matcher: ['/', '/monstros/:path*'],
};
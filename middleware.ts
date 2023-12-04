import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const middleware = withAuth(
  function middleware(req) {
    try {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
      }

      if (req.nextauth.token.role !== 'ADMIN') {
        return NextResponse.redirect(
          new URL(`/grupos/${req.nextauth.token.groupId}`, req.url)
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (token) return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|!landing|!/auth/signin|!grupos).*)',
  ],
};

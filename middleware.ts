// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { withAuth } from 'next-auth/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
export const middleware = withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // @ts-ignore
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }
    if (req.nextauth.token.role !== 'ADMIN') {
      return NextResponse.redirect(
        new URL(`/grupos/${req.nextauth.token.groupId}`, req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   console.log('hola a');
// const session = await getServerSession(authOptions);
// if (!session) {
//   return NextResponse.redirect(new URL('/login', request.url));
// }
// if (session.user.role === 'ADMIN') {
//   return NextResponse.redirect(new URL('/', request.url));
// }
// }

// // See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|!login|!/auth/signin|!grupos).*)',
  ],
};
// export default function middleware() {}

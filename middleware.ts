import { NextResponse, NextMiddleware } from 'next/server';
import { JwtConfig, verifyAuth } from '@/lib/jwt';
import { HttpError } from '@/lib/error';
import { NextURL } from 'next/dist/server/web/next-url';

export const middleware: NextMiddleware = async (req, event) => {
  try {
    if (req.nextUrl.pathname.includes('admin')) {
      await verifyAuth(req.cookies.get(JwtConfig.Key));
      return NextResponse.next();
    }
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.redirect(new URL('/404', req.url), {
        status: 308,
      });
    }
  }
};

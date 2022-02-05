// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse, NextMiddleware } from 'next/server';
import { JwtConfig, verifyAuth } from '@/lib/jwt';
import { HttpError } from '@/lib/error';
export const middleware: NextMiddleware = async (req, event) => {
  try {
    verifyAuth(req.cookies[JwtConfig.Key]);
    return NextResponse.next();
  } catch (err) {
    if (err instanceof HttpError) {
      return new Response(
        JSON.stringify({
          error: err.name,
          desc: err.message,
        }),
        {
          status: err.code,
        }
      );
    }
  }
};

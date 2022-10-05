import { SignJWT, jwtVerify } from 'jose';
import { Unauthorized } from '@/lib/error';
import { NextRequest } from 'next/server';
import { NextApiRequest } from 'next';

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export async function verifyAuth(token?: string) {
  if (!token) {
    throw new Unauthorized('Missing user token');
  }

  try {
    await jwtVerify(token, JwtConfig.Secret);
  } catch (err) {
    console.log('jwt auth error', err);
    throw new Unauthorized('Your token has expired.');
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function signJwt() {
  return await new SignJWT({})
    .setExpirationTime('2d')
    .setProtectedHeader({
      alg: 'HS256',
    })
    .sign(JwtConfig.Secret);
}

const JwtSecret = process.env.JWT_SECRET;
const secret = new Uint32Array(JwtSecret.length);
for (let i = 0; i < JwtSecret.length; i++) {
  secret[i] = JwtSecret.charCodeAt(i);
}

export async function ensureAuth(request: NextApiRequest) {
  return verifyAuth(request.cookies[JwtConfig.Key]);
}

export const JwtConfig = {
  Secret: new Uint8Array(secret),
  Key: 'auth-jwt',
};

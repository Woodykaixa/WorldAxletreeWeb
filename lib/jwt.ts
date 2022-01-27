import * as jwt from 'jsonwebtoken';
import { Unauthorized } from '@/lib/error';

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export function verifyAuth(token?: string) {
  if (!token) {
    throw new Unauthorized('Missing user token');
  }

  try {
    jwt.verify(token, JwtConfig.Secret);
  } catch (err) {
    console.log('jwt auth error', err);
    throw new Unauthorized('Your token has expired.');
  }
}

/**
 * Adds the user token cookie to a response.
 */
export function signJwt() {
  return jwt.sign({}, JwtConfig.Secret, {
    expiresIn: '2d',
  });
}

export const JwtConfig = {
  Secret: process.env.JWT_SECRET,
  Key: 'auth-jwt',
};

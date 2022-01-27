// utils/cookies.ts

import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse } from 'next';
export const CookieOptions: CookieSerializeOptions = { path: '/', httpOnly: true, secure: true };

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: CookieSerializeOptions = CookieOptions
) => {
  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, value, options));
};

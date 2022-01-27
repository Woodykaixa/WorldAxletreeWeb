import type { NextApiHandler } from 'next';
import { JwtConfig } from '@/lib/jwt';
import { setCookie } from '@/lib/cookie';

const handler: NextApiHandler = (req, res) => {
  console.log(req);
  const jwt = req.cookies[JwtConfig.Key];

  if (jwt) {
    setCookie(res, JwtConfig.Key, '', {
      expires: new Date(Date.now() - 114514),
    });
  }
  res.status(302).redirect('/');
};

export default handler;

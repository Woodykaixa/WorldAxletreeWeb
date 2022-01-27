import type { NextApiHandler } from 'next';
import { Auth, Err } from '@/dto';
import { parseParam, errorHandler } from '@/lib/api';
import { Unauthorized } from '@/lib/error';
import { JwtConfig, signJwt } from '@/lib/jwt';
import { setCookie } from '@/lib/cookie';

const {
  parser: { strLengthGt },
} = parseParam;
const handler: NextApiHandler<Err.Resp> = (req, res) => {
  parseParam<Auth.AuthDTO>(req.query, {
    auth: strLengthGt(0),
  })
    .then(({ auth }) => {
      if (auth !== process.env.ADMIN) {
        throw new Unauthorized('wrong password');
      }
      const jwt = signJwt();
      setCookie(res, JwtConfig.Key, jwt);
      res.status(302).redirect('/admin');
    })
    .catch(errorHandler(res));
};

export default handler;

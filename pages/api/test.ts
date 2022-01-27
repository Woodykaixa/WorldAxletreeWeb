import type { NextApiHandler } from 'next';
import prismaClient from '@/lib/prisma';

const handler: NextApiHandler = async (req, res) => {
  try {
    await prismaClient.$connect();
    res.status(200).send('ok');
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.name, desc: error.message });
  } finally {
    prismaClient.$disconnect();
  }
};

export default handler;

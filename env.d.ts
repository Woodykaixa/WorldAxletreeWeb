import type { PrismaClient } from '@prisma/client';

declare global {
  // PrismaClient is attached to the `global` object in development to prevent
  // exhausting your database connection limit.
  //
  // Learn more:
  // https://pris.ly/d/help/next-js-best-practices
  // So we only use this global var in development mode
  var prisma: PrismaClient;

  declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_ENV: 'development' | 'production';
      ADMIN: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

export {};

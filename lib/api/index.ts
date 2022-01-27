export * from './parseParam';
import { Err } from '@/dto';
import { MethodNotAllowed, HttpError } from '../error';
import { NextApiResponse } from 'next';

export async function ensureMethod(actual: string | undefined, expect: string[]): Promise<void> {
  if (!actual || !expect.includes(actual)) {
    throw new MethodNotAllowed();
  }
  return;
}

export function firstValue<T>(p: T | T[]) {
  return Array.isArray(p) ? p[0] : p;
}

export function raiseError(errResp: Err.Resp) {
  const error = new Error(errResp.description);
  error.name = errResp.error;
  throw error;
}

export function errorHandler(response: NextApiResponse<Err.Resp>) {
  return function (err: any) {
    console.error('error log:', err);
    if (err instanceof Error) {
      response.status(err instanceof HttpError ? err.code : 500).json({
        error: err.name,
        description: err.message,
      });
    } else {
      response.status(500).json({
        error: Object.toString.call(err),
        description: err,
      });
    }
  };
}

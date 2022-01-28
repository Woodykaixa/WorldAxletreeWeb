import { Err } from '@/dto';
export class HttpError extends Error {
  public readonly code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = 'HttpError';
  }
}

export class BadRequest extends HttpError {
  constructor(message: string = 'bad request') {
    super(message, 400);
    this.name = 'BadRequest';
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string = 'unauthorized') {
    super(message, 401);
    this.name = 'Unauthorized';
  }
}

export class NotFound extends HttpError {
  constructor(message: string = 'not found') {
    super(message, 404);
    this.name = 'NotFound';
  }
}

export class MethodNotAllowed extends HttpError {
  constructor(message: string = 'method not allowed') {
    super(message, 405);
    this.name = 'MessageNotAllowed';
  }
}

export function makeError(errResp: Err.Resp) {
  const error = new Error(errResp.description);
  error.name = errResp.error;
  throw error;
}

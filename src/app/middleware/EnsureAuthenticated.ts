import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../../errors/AppError';

import authConfig from '../../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 400);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as TokenPayload;

    request.user_id = sub;

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 400);
  }
}

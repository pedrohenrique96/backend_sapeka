import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

import AppError from '../../errors/AppError';

export default async function verifyUserProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const usersRepository = getRepository(User);

  const user = await usersRepository.findOne({
    where: { id: request.user_id },
  });

  if (!user?.admin) {
    throw new AppError('User is not manager', 401);
  } else {
    next();
  }
}

import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/User';
import authConfig from '../../config/auth';

import AppError from '../../errors/AppError';

export default class ProductController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, { subject: String(user.id), expiresIn });

    return res.status(200).json({ user, token });
  }
}

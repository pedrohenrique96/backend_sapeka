import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import AppError from '../../errors/AppError';

export default class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password, admin = false } = req.body;
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await usersRepository.create({
      name,
      email,
      password: password_hash,
      admin,
    });

    await usersRepository.save(user);

    return res.status(200).json(user);
  }
}

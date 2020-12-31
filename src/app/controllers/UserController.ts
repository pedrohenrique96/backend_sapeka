import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import * as yup from 'yup';
import User from '../models/User';
import AppError from '../../errors/AppError';

export default class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password, admin = false } = req.body;
    const usersRepository = getRepository(User);

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
      admin: yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      throw new AppError('Validation fails', 400);
    }

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
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

import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import * as yup from 'yup';
import User from '../models/User';
import AppError from '../../errors/AppError';

interface dados {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

class CreateServiceUser {
  async execute({ admin, email, name, password }: dados): Promise<User> {
    const usersRepository = getRepository(User);

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
      admin: yup.boolean().required(),
    });

    if (!(await schema.isValid({ name, admin, password, email }))) {
      throw new AppError('Validation fails', 400);
    }

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = usersRepository.create({
      name,
      email,
      password: password_hash,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateServiceUser;

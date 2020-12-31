import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import AppError from '../../errors/AppError';
import Category from '../models/Category';

export default class CategoryController {
  async getAll(req: Request, res: Response): Promise<Response> {
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.find();

    return res.status(200).json(category);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const categoryRepository = getRepository(Category);
    const { name, kidsOrManOrWoman } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      kidsOrManOrWoman: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      throw new AppError('Validation fails', 400);
    }

    const isExist = await categoryRepository.findOne({ name });

    if (isExist) {
      throw new AppError('This Category is exist', 401);
    }

    const category = await categoryRepository.create({
      name,
      kidsOrManOrWoman,
    });

    await categoryRepository.save(category);

    return res.status(200).json(category);
  }
}

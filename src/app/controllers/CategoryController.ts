import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Category from '../models/Category';

export default class CategoryController {
  async store(req: Request, res: Response): Promise<Response> {
    const ItCategory = getRepository(Category);
    const { name } = req.body;

    const isExist = await ItCategory.findOne({ name });

    if (isExist) {
      throw new AppError('This Category is exist', 401);
    }

    const category = await ItCategory.create({
      name,
    });

    await ItCategory.save(category);

    return res.status(200).json(category);
  }
}

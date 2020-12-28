import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import SubCategory from '../models/SubCategory';

export default class SubCategoryController {
  async store(req: Request, res: Response): Promise<Response> {
    const ItSubCategory = getRepository(SubCategory);
    const { name, category_id } = req.body;

    const isExist = await ItSubCategory.findOne({ name });

    if (isExist) {
      throw new AppError('This SubCategory is exist', 400);
    }

    const subcategory = await ItSubCategory.create({
      name,
      category_id
    });

    await ItSubCategory.save(subcategory);

    return res.status(200).json(subcategory);
  }
}

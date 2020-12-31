import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import AppError from '../../errors/AppError';
import SubCategory from '../models/SubCategory';
import Category from '../models/Category';

export default class SubCategoryController {
  async getAll(req: Request, res: Response): Promise<Response> {
    const subCategoryRepository = getRepository(SubCategory);

    const subcategory = await subCategoryRepository.find({
      relations: ['category'],
    });

    return res.status(200).json(subcategory);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const subCategoryRepository = getRepository(SubCategory);
    const categoryRepository = getRepository(Category);
    const { name, category_id } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      category_id: yup.number().negative().required(),
    });

    if (!(await schema.isValid(req.body))) {
      throw new AppError('Validation fails', 400);
    }

    const isExist = await subCategoryRepository.findOne({ name });
    if (isExist) {
      throw new AppError('This SubCategory is exist', 400);
    }

    const isExistCategories = await categoryRepository.findOne({
      where: { id: category_id },
    });
    if (!isExistCategories) {
      throw new AppError('This Category is not exist', 400);
    }

    const subcategory = await subCategoryRepository.create({
      name,
      category_id,
    });

    await subCategoryRepository.save(subcategory);

    return res.status(200).json(subcategory);
  }
}

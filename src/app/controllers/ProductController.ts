import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import Product from '../models/Product';
import SubCategory from '../models/SubCategory';
import AppError from '../../errors/AppError';

export default class ProductController {
  async getAll(req: Request, res: Response): Promise<Response> {
    const productRepository = getRepository(Product);

    const product = await productRepository.find({
      relations: ['subcategory'],
    });

    return res.status(200).json(product);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { name, price, description, subcategory_id } = req.body;
    const { path, filename } = req.file;
    const productRepository = getRepository(Product);
    const subCategoriesRepository = getRepository(SubCategory);

    const schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().positive().required(),
      subcategory_id: yup.number().positive().required(),
      description: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      throw new AppError('Validation fails', 400);
    }

    const isExistSubCategories = await subCategoriesRepository.findOne({
      where: { id: subcategory_id },
    });

    if (!isExistSubCategories) {
      throw new AppError('This SubCategory is not exist', 400);
    }

    const product = await productRepository.create({
      name,
      price,
      description,
      subcategory_id,
      imageName: filename,
      pathImage: path,
    });

    await productRepository.save(product);

    return res.status(200).json(product);
  }
}

import { getRepository } from 'typeorm';
import * as yup from 'yup';
import Product from '../models/Product';
import SubCategory from '../models/SubCategory';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
  price: number;
  description: string;
  subcategory_id: number;
}

class CreateServiceProduct {
  async execute({
    description,
    name,
    price,
    subcategory_id,
  }: Request): Promise<Product> {
    const productRepository = getRepository(Product);
    const subCategoriesRepository = getRepository(SubCategory);

    const schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().positive().required(),
      subcategory_id: yup.number().positive().required(),
      description: yup.string().required(),
      imageName: yup.string(),
    });

    if (!(await schema.isValid({ description, name, price, subcategory_id }))) {
      throw new AppError('Validation fails', 400);
    }

    const subCategoryExists = await subCategoriesRepository.findOne({
      where: { id: subcategory_id },
    });

    if (!subCategoryExists) {
      throw new AppError('This SubCategory is not exist', 400);
    }

    const product = productRepository.create({
      name,
      price,
      description,
      subcategory_id: subCategoryExists.id,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateServiceProduct;

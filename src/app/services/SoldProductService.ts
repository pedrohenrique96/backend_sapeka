import { getRepository } from 'typeorm';
import Product from '../models/Product';
import AppError from '../../errors/AppError';

class SoldProductService {
  async execute(id: number): Promise<void> {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new AppError('This product is not exist', 400);
    }

    product.sold = true;
    await productRepository.save(product);
  }
}

export default SoldProductService;

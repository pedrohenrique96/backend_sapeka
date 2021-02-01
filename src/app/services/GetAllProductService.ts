import { getRepository } from 'typeorm';
import Product from '../models/Product';

class GetAllProductService {
  async execute(): Promise<Product[]> {
    const productRepository = getRepository(Product);

    const product = await productRepository.find({
      relations: ['subcategory'],
      order: { created_at: 'DESC' },
    });

    return product;
  }
}

export default GetAllProductService;

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../models/Product';
import DeleteServiceProduct from '../services/DeleteServiceProduct';
import CreateServiceProduct from '../services/CreateServiceProduct';

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
    const { filename } = req.file;

    const product = await new CreateServiceProduct().execute({
      description,
      filename,
      name,
      price,
      subcategory_id,
    });

    return res.status(200).json(product);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await new DeleteServiceProduct().execute(Number(id));
    return res.status(200).json();
  }
}

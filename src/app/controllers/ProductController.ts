import { Request, Response } from 'express';
import Product from '../models/Product';

export default class ProductController {
  async store(req: Request, res: Response): Promise<Response> {
    const { name, price, description } = req.body;
    const { filename: image } = req.file;

    const product = await Product.create({
      name,
      price,
      description,
      image,
    });

    return res.status(200).json(product);
  }
}

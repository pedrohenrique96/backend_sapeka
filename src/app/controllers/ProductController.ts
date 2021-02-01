import { Request, Response } from 'express';
import DeleteServiceProduct from '../services/DeleteServiceProduct';
import CreateServiceProduct from '../services/CreateServiceProduct';
import SoldProductService from '../services/SoldProductService';
import GetAllProductService from '../services/GetAllProductService';

export default class ProductController {
  async getAll(req: Request, res: Response): Promise<Response> {
    const product = await new GetAllProductService().execute();
    return res.status(200).json(product);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { name, price, description, subcategory_id, sold = false } = req.body;

    const product = await new CreateServiceProduct().execute({
      description,
      name,
      price,
      subcategory_id,
      sold,
    });

    return res.status(200).json(product);
  }

  async soldProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await new SoldProductService().execute(Number(id));
    return res.status(200).json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await new DeleteServiceProduct().execute(Number(id));
    return res.status(200).json();
  }
}

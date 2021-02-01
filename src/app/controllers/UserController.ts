import { Request, Response } from 'express';
import CreateServiceUser from '../services/CreateServiceUser';

export default class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password, admin = false } = req.body;

    const user = await new CreateServiceUser().execute({
      admin,
      email,
      name,
      password,
    });

    return res.status(200).json(user);
  }
}

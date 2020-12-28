import { Router } from 'express';
import UserController from '../controllers/UserController';

const usersRouter = Router();

// instances
const _userController = new UserController();

usersRouter.post('/', _userController.store);

export default usersRouter;

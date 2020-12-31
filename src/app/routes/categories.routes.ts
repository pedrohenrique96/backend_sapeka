import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import ensureAuthenticated from '../middleware/EnsureAuthenticated';

const categoriesRouter = Router();

// instances
const _categoryController = new CategoryController();

categoriesRouter.use(ensureAuthenticated);
categoriesRouter.post('/', _categoryController.store);
categoriesRouter.get('/', _categoryController.getAll);

export default categoriesRouter;

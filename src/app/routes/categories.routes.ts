import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import ensureAuthenticated from '../middleware/EnsureAuthenticated';
import verifyUserProvider from '../middleware/VerifyUserProvider';

const categoriesRouter = Router();

// instances
const categoryController = new CategoryController();

categoriesRouter.use(ensureAuthenticated);
categoriesRouter.use(verifyUserProvider);

categoriesRouter.post('/', categoryController.store);
categoriesRouter.get('/', categoryController.getAll);
categoriesRouter.delete('/delete/:id', categoryController.delete);

export default categoriesRouter;

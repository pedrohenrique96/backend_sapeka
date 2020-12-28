import { Router } from 'express';
import SubCategoryController from '../controllers/SubCategoryController';
import ensureAuthenticated from '../middleware/EnsureAuthenticated';

const subCategoriesRouter = Router();

// instances
const _subCategoryController = new SubCategoryController();

subCategoriesRouter.use(ensureAuthenticated);
subCategoriesRouter.post('/', _subCategoryController.store);

export default subCategoriesRouter;

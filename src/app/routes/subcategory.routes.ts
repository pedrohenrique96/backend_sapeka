import { Router } from 'express';
import SubCategoryController from '../controllers/SubCategoryController';
import ensureAuthenticated from '../middleware/EnsureAuthenticated';
import verifyUserProvider from '../middleware/VerifyUserProvider';

const subCategoriesRouter = Router();

// instances
const subCategoryController = new SubCategoryController();

subCategoriesRouter.use(ensureAuthenticated);
subCategoriesRouter.use(verifyUserProvider);
subCategoriesRouter.post('/', subCategoryController.store);
subCategoriesRouter.get('/', subCategoryController.getAll);
subCategoriesRouter.delete('/delete/:id', subCategoryController.delete);

export default subCategoriesRouter;

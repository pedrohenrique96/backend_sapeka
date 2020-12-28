import { Router } from 'express';

import productsRouter from './products.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import categoriesRouter from './categories.routes';
import subCategoriesRouter from './subcategory.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/subCategories', subCategoriesRouter);

export default routes;

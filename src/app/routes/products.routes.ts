import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../config/upload';
import ProductController from '../controllers/ProductController';
import ensureAuthenticated from '../middleware/EnsureAuthenticated';

const productRouter = Router();
const upload = multer(uploadConfig);

// instances
const _productController = new ProductController();

productRouter.use(ensureAuthenticated);
productRouter.post(
  '/',
  upload.single('file'),
  _productController.store,
);

export default productRouter;

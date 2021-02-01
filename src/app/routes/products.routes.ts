import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../config/upload';
import ProductController from '../controllers/ProductController';
import ensureAuthenticated from '../middleware/EnsureAuthenticated';
import verifyUserProvider from '../middleware/VerifyUserProvider';

const productRouter = Router();
const upload = multer(uploadConfig);

// instances
const productController = new ProductController();

productRouter.use(ensureAuthenticated);
productRouter.use(verifyUserProvider);

productRouter.post('/', upload.single('file'), productController.store);
productRouter.get('/', productController.getAll);
productRouter.delete('/delete/:id', productController.delete);

export default productRouter;

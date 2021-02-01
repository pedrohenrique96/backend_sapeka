import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Product from '../models/Product';
import AppError from '../../errors/AppError';
import uploadConfig from '../../config/upload';

class DeleteServiceProduct {
  async execute(id: number): Promise<void> {
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new AppError('This product is not exist', 400);
    }

    if (product.imageName) {
      const imageFilePath = path.join(
        uploadConfig.directory,
        product.imageName,
      );

      fs.stat(imageFilePath, (err, stats) => {
        if (err) {
          console.log(err);
          return;
        }

        if (stats.isFile()) {
          fs.unlink(imageFilePath, err => {
            if (err) {
              console.log(err);
              return;
            }
          });
        }
      });
    }
    await productRepository.delete(product.id);
    return;
  }
}

export default DeleteServiceProduct;

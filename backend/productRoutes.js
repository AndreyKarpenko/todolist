import { Router } from 'express';
import {
  getAllProductsController,
  createProductController,
  updateProductController,
  deleteProductController,
  deleteAllProductsController,
} from './productController.js';

export const router = Router();

router.get('/', getAllProductsController);

router.post('/', createProductController);

router.put('/:id', updateProductController);

router.delete('/:id', deleteProductController);

router.delete('/', deleteAllProductsController);

export default router;

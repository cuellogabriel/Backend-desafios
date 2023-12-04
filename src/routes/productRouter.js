import { Router } from 'express';
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js';
import { productValidator } from '../validator/validators.js'
const productRouter = Router();

// Rutas para ProductManager
productRouter.get('/', getProducts);
productRouter.post('/', productValidator, addProduct);
productRouter.get('/:pid', getProductById);
productRouter.put('/:pid', updateProduct);
productRouter.delete('/:pid', deleteProduct);

export default productRouter;

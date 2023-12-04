import { Router } from 'express';
import {
  createCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  updateCart,
  updateProductQuantity
} from '../controllers/cartControllers.js';

const cartRouter = Router();

// Ruta para crear un nuevo carrito
cartRouter.post('/', createCart);

// Ruta para obtener un carrito por su ID
cartRouter.get('/:cid', getCartById);

// Ruta para actualizar el carrito con nuevos productos
cartRouter.put('/:cid', updateCart);

// Ruta para limpiar el carrito (eliminar todos los productos)
cartRouter.delete('/:cid', clearCart);

// Ruta para agregar un producto a un carrito
cartRouter.post('/:cid/products/:pid', addProductToCart);

// Ruta para quitar un producto del carrito
cartRouter.delete('/:cid/products/:pid', removeProductFromCart);

// Ruta para actualizar la cantidad de ejemplares de un producto en el carrito
cartRouter.put('/:cid/products/:pid', updateProductQuantity);

export default cartRouter;

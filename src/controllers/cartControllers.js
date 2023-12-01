import CartManager from '../managers/CartManager.js';

const cartManager = new CartManager();

// Crear un nuevo carrito
const createCart = async (req, res, next) => {
  try {
    const newCart = await cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    next(error);
  }
};

// Obtener un carrito por su ID
const getCartById = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartContents(cartId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// Agregar un producto a un carrito
const addProductToCart = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const cartId = req.params.cid;

    const cart = await cartManager.addToCart(productId, cartId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// Quitar un producto del carrito
const removeProductFromCart = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const cartId = req.params.cid;

    const cart = await cartManager.removeFromCart(productId, cartId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// Limpiar el carrito (eliminar todos los productos)
const clearCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;

    const cart = await cartManager.clearCart(cartId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// Actualizar el carrito con nuevos productos
const updateCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const updatedCart = req.body;

    const cart = await cartManager.updateCart(cartId, updatedCart);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// Actualizar la cantidad de ejemplares de un producto en el carrito
const updateProductQuantity = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const cartId = req.params.cid;
    const { quantity } = req.body;

    // Validar que la cantidad sea un número positivo
    if (typeof quantity !== 'number' || quantity <= 0) {
      res.status(400).json({ error: 'La cantidad debe ser un número positivo' });
      return;
    }

    const cart = await cartManager.updateProductQuantity(productId, cartId, quantity);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export {
  createCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  updateCart,
  updateProductQuantity
};

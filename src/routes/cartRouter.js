import { Router } from 'express';
import CartManager from '../managers/CartManager';
import ProductManager from '../managers/ProductManager';

const cartRouter = Router();
const productManager = new ProductManager();
const cartFilePath = 'src/cart.json'
const cartManager = new CartManager(cartFilePath)

// Ruta para crear un nuevo carrito
cartRouter.post('/', (req, res) => {
  const newCart = {
    id: generateUniqueCartId(),
    products: [],
  };
  cartManager.addCart(newCart);
  res.json(newCart);
});

// Ruta para obtener un carrito por su ID
cartRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = cartManager.findCart(cartId);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Ruta para agregar un producto a un carrito
cartRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  const cart = cartManager.findCart(cartId);
  if (!cart) {
    res.status(404).json({ error: 'Carrito no encontrado' });
    return;
  }

  // Encuentra el producto por su ID utilizando ProductManager
  let product;
  try {
    product = productManager.getProductById(productId);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  // Verifica si ya existe el producto en el carrito
  const existingProduct = cartManager.findProductInCart(cartId, productId);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cartManager.addProductToCart(cartId, { product, quantity });
  }

  res.json(cart);
});

cartRouter.get('/', (req, res) => {
  const allCarts = cartManager.getCartContents();
  res.json(allCarts);
});
// Función para generar un ID de carrito único
function generateUniqueCartId() {
  return `cart-${Math.floor(Math.random() * 100000)}`;
}

export default cartRouter;
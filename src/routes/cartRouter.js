import { Router } from 'express';
import { getProductById } from '../CartManager';

const cartRouter = Router();
const cart = [];

// Ruta para crear un nuevo carrito
cartRouter.post('/', (req, res) => {
  const newCart = {
    id: generateUniqueCartId(),
    products: [],
  };
  cart.push(newCart);
  res.json(newCart);
});

// Ruta para obtener un carrito por su ID
cartRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = cart.find((cart) => cart.id === cartId);
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

  const cart = cart.find((cart) => cart.id === cartId);
  if (!cart) {
    res.status(404).json({ error: 'Carrito no encontrado' });
    return;
  }

  // Encuentra el producto por su ID (debes implementar la lógica para obtener un producto)
  const product = findProductById(productId);
  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  // Verifica si ya existe el producto en el carrito
  const existingProduct = cart.products.find((p) => p.product.id === productId);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ product, quantity });
  }

  res.json(cart);
});

// Función para generar un ID de carrito único
function generateUniqueCartId() {
  return `cart-${Math.floor(Math.random() * 100000)}`;
}

function findProductById(productId) {
    try {
      // Llama al método getProductById de tu ProductManager para buscar el producto
      const product = getProductById(productId);
      return product;
    } catch (error) {
      // Si no se encuentra el producto, se maneja el error
      return null; // Puedes devolver null u otro valor que desees
    }
}

export default cartRouter;
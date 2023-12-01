import { Router } from 'express';
import ProductManager from '../managers/ProductManager';
import { productValidator } from '../validator/validators';

const productRouter = Router();
const productManager = new ProductManager(); // Crear una instancia de ProductManager

// Ruta para obtener todos los productos (GET /api/products)
productRouter.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);
  if (limit && limit < productManager.getProducts().length) {
    res.json(productManager.getProducts().slice(0, limit));
  } else {
    res.json(productManager.getProducts());
  }
});

// Ruta para obtener un producto por su ID (GET /api/products/:pid)
productRouter.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  try {
    const product = productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para agregar un nuevo producto (POST /api/products)
productRouter.post('/',productValidator, (req, res) => {
  const productData = req.body;
  try {
    const product = productManager.addProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para actualizar un producto por su ID (PUT /api/products/:pid)
productRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedFields = req.body;
  try {
    productManager.updateProduct(productId, updatedFields);
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para eliminar un producto por su ID (DELETE /api/products/:pid)
productRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  try {
    productManager.deleteProduct(productId);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

export default productRouter;
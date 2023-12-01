import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';

const filePath = './products.json';

class ProductManager {
  constructor() {
    this.products = [];
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      this.products = JSON.parse(data);
    } catch (err) {
      this.products = [];
    }
  }

  async saveProducts() {
    await fs.writeFile(filePath, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(productData) {
    const requiredFields = ['name', 'price']; // Agrega los campos requeridos
    for (const field of requiredFields) {
      if (!productData[field]) {
        throw new Error(`Campo "${field}" es requerido.`);
      }
    }

    const id = uuidv4();
    const product = { id, ...productData };
    this.products.push(product);
    this.saveProducts();
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }
    this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
    this.saveProducts();
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }
    this.products.splice(productIndex, 1);
    this.saveProducts();
  }
}

export default ProductManager;
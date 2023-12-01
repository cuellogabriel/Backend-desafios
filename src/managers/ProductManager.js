import { v4 as uuidv4 } from 'uuid';
import { promises as fsPromises } from 'fs';

const filePath = 'src/products.json';

class ProductManager {
  constructor() {
    this.products = [];
    this.loadProducts(); 
  }

  async loadProducts() {
    try {
      const data = await fsPromises.readFile(filePath, 'utf8');
      this.products = JSON.parse(data);
      // console.log('loadProducts data', this.products)
    } catch (err) {
      console.log('Error loading products. File path:', filePath, 'Error:', err)
    }
  }

  async saveProducts() {
    await fsPromises.writeFile(filePath, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(productData) {
    const requiredFields = ['title', 'price']; // Agrega los campos requeridos
    for (const field of requiredFields) {
      if (!productData[field]) {
        throw new Error(`Campo "${field}" es requerido.`);
      }
    }

    const existingProduct = this.products.find(p => p.id === productData.id);
    if (existingProduct) {
      throw new Error(`Ya existe un producto con el ID "${productData.id}".`);
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
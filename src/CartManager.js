// Importa módulos necesarios
import { promises as fsPromises } from 'fs';

class CartManager {
  constructor(cartFilePath) {
    this.cartFilePath = cartFilePath;
    this.cart = this.loadCart();
  }

  async loadCart() {
    try {
      const cartData = await fsPromises.readFile(this.cartFilePath, 'utf8');
      return JSON.parse(cartData);
    } catch (error) {
      // Manejar errores de lectura del archivo
      console.error('Error al cargar el carrito:', error);
      return [];
    }
  }

  async saveCart() {
    try {
      await fsPromises.writeFile(this.cartFilePath, JSON.stringify(this.cart, null, 2));
    } catch (error) {
      // Manejar errores de escritura en el archivo
      console.error('Error al guardar el carrito:', error);
    }
  }

  addToCart(product) {
    // Verifica si el producto ya está en el carrito antes de agregarlo
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      // Puedes implementar lógica adicional aquí, como aumentar la cantidad
    } else {
      this.cart.push(product);
    }
    this.saveCart();
  }

  removeFromCart(productId) {
    // Encuentra y elimina el producto del carrito por su ID
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  getCartContents() {
    return this.cart;
  }
}

export default CartManager;
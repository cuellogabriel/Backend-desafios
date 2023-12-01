import CartModel from '../db/models/cartSchema.js';
import ProductModel from '../db/models/productsSchema.js';

class CartManager {
  // Agregar un producto al carrito
  async addToCart(productId, cartId) {
    try {
      // Buscar el producto por su ID en la base de datos
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Obtener el carrito por su ID y cargar los productos asociados
      let cart = await CartModel.findById(cartId).populate('products');
      if (!cart) {
        // Si no hay un carrito, crear uno nuevo
        cart = await this.createCart();
      }

      // Verificar si el producto ya está en el carrito
      const existingProduct = cart.products.find((item) => item.id === productId);
      if (existingProduct) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        existingProduct.quantity += 1;
      } else {
        // Si el producto no está en el carrito, agregarlo
        cart.products.push({ product, quantity: 1 });
      }

      // Guardar el carrito actualizado en la base de datos
      await cart.save();
      console.log('Product added to cart:', product.title);
      return cart;
    } catch (error) {
      // Manejar errores y registrarlos en la consola
      console.log('Error adding to cart:', error.message);
      throw error;
    }
  }

  // Crear un nuevo carrito
  async createCart() {
    try {
      const newCart = await CartModel.create({ products: [] });
      console.log('New cart created:', newCart.id);
      return newCart;
    } catch (error) {
      console.log('Error creating cart:', error.message);
      throw error;
    }
  }
 
  // Quitar un producto del carrito
  async removeFromCart(productId, cartId) {
    try {
      // Obtener el carrito por su ID y cargar los productos asociados
      let cart = await CartModel.findById(cartId).populate('products');
      if (!cart) {
        throw new Error('Cart not found');
      }

      // Filtrar los productos y eliminar el producto por su ID
      cart.products = cart.products.filter((item) => item.id !== productId);

      // Guardar el carrito actualizado en la base de datos
      await cart.save();
      console.log('Product removed from cart:', productId);
      return cart;
    } catch (error) {
      console.log('Error removing from cart:', error.message);
      throw error;
    }
  }

  // Limpiar el carrito (eliminar todos los productos)
  async clearCart(cartId) {
    try {
      // Obtener el carrito por su ID
      let cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }

      // Limpiar los productos del carrito
      cart.products = [];

      // Guardar el carrito actualizado en la base de datos
      await cart.save();
      console.log('Cart cleared:', cartId);
      return cart;
    } catch (error) {
      console.log('Error clearing cart:', error.message);
      throw error;
    }
  }

  // Actualizar el carrito con nuevos productos
  async updateCart(cartId, updatedCart) {
    try {
      // Obtener el carrito por su ID y cargar los productos asociados
      let cart = await CartModel.findById(cartId).populate('products');
      if (!cart) {
        throw new Error('Cart not found');
      }

      // Actualizar los productos del carrito con los nuevos productos
      cart.products = updatedCart.products;

      // Guardar el carrito actualizado en la base de datos
      await cart.save();
      console.log('Cart updated:', cartId);
      return cart;
    } catch (error) {
      console.log('Error updating cart:', error.message);
      throw error;
    }
  }

  
  // Obtener el contenido del carrito
  async getCartContents(cartId) {
    try {
      // Obtener el carrito por su ID y cargar los productos asociados
      const cart = await CartModel.findById(cartId).populate('products');
      if (!cart) {
        throw new Error('Cart not found');
      }

      console.log('Cart contents retrieved:', cartId);
      return cart;
    } catch (error) {
      console.log('Error getting cart contents:', error.message);
      throw error;
    }
  }

// Actualizar la cantidad de ejemplares de un producto en el carrito
async updateProductQuantity(productId, cartId, quantity) {
  try {
    // Obtener el carrito por su ID y cargar los productos asociados
    let cart = await CartModel.findById(cartId).populate('products');
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Encontrar el producto en el carrito por su ID
    const cartProduct = cart.products.find((item) => item.product.id === productId);

    // Verificar si el producto existe en el carrito
    if (!cartProduct) {
      throw new Error('Product not found in the cart');
    }

    // Actualizar la cantidad del producto en el carrito
    cartProduct.quantity = quantity;

    // Guardar el carrito actualizado en la base de datos
    await cart.save();

    console.log('Product quantity updated in cart:', productId);
    return cart;
  } catch (error) {
    console.log('Error updating product quantity in cart:', error.message);
    throw error;
  }
}

}

export default CartManager;


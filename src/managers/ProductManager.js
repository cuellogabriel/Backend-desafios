import ProductModel from '../db/models/productsSchema.js';

class ProductManager {
  async getProducts({ limit = 10, page = 1, sort, query }) {
    try {
      const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort === 'desc' ? { price: -1 } : sort === 'asc' ? { price: 1 } : undefined,
      };

      const filter = query ? { category: query } : {};

      const result = await ProductModel.paginate(filter, options);

      return {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
        nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null,
      };
    } catch (error) {
      console.log('Error al obtener productos:', error);
      return { status: 'error', payload: error.message };
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      console.log('Error al obtener producto por ID:', error);
      throw error;
    }
  }

  async addProduct(productData) {
    try {
      const product = new ProductModel(productData);
      await product.save();
      return product;
    } catch (error) {
      console.log('Error al agregar producto:', error);
      throw error;
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const product = await ProductModel.findByIdAndUpdate(id, updatedFields, { new: true });
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      console.log('Error al actualizar producto:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const product = await ProductModel.findByIdAndDelete(id);
      return product;
    } catch (error) {
      console.log('Error al eliminar producto:', error);
      throw error;
    }
  }
}

export default ProductManager;


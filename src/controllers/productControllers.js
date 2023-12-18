import ProductDao from '../daos/ProductDao.js';

const productDao = new ProductDao();

// Obtener todos los productos con paginación, filtros y ordenamiento
const getProducts = async (req, res, next) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const result = await productDao.getProducts({ limit, page, sort, query });
    res.json(result);
  } catch (error) {
    next(error); 
  }
};

// Obtener un producto por su ID
const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const product = await productDao.getProductById(productId);
    res.json(product);
  } catch (error) {
    next(error); 
  }
};

// Agregar un nuevo producto
const addProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const product = await productDao.addProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    next(error); 
  }
};

// Actualizar un producto por su ID
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const updatedFields = req.body;
    await productDao.updateProduct(productId, updatedFields);
    res.status(200).json({ status: 'success', message: 'Producto actualizado correctamente' });
  } catch (error) {
    next(error); 
  }
};

// Eliminar un producto por su ID
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    await productDao.deleteProduct(productId);
    res.status(204).json({status: 'success', message: 'Producto eliminado correctamente'});
  } catch (error) {
    next(error); 
  }
};

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct };

import connectToDataBase from './db/connectionDataBase.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import { json, urlencoded } from 'express';
import { engine } from 'express-handlebars'
import http from 'http';
// import socketIO from 'socket.io';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from './routes/index.js';
import ProductDao from './daos/ProductDao.js';
import CartDao from './daos/CartDao.js';
import { errorHandler } from './middlewares/errorHandler.js';
import session from 'express-session';
import { mongoStoreOptions } from './mongoStore/connectionMongo.js';
import { requireAuth } from './middlewares/auth.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
// const io = socketIO(server);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(mongoStoreOptions))
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Handlebars

app.engine('handlebars', engine({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Conectar a la base de datos antes de configurar las rutas
connectToDataBase().then(() => {
  // Rutas
  app.use('/api', routes);

  // Middleware de errores
  app.use(errorHandler);


  const productDao = new ProductDao()
  const cartDao = new CartDao()
  // Ruta para la vista login.handlebars
  app.get('/', (req, res) => {

    // Renderiza la vista login.handlebars
    res.render('login');
  });

// Ruta para la vista de registro
app.get('/register', (req, res) => {
  res.render('register');
});

// Ruta para errorLogin
app.get('/errorLogin', (req, res) => {
  res.render('errorLogin');
});
// Ruta para errorRegister
app.get('/errorRegister', (req, res) => {
  res.render('errorRegister');
});
// Ruta para errorCredencial
app.get('/errorCredencial', (req, res) => {
  res.render('errorCredencial');
});

// Ruta para la vista de perfil
app.get('/profile', requireAuth, (req, res) => {
  // Renderiza la vista de perfil con los datos del usuario
  res.render('profile', { user: req.session.user });
});

  // Rutas para productos y carritos
  app.get('/products', requireAuth ,async (req, res) => {
    const user = res.locals.user;

    
    const limit = 10;
    const page = parseInt(req.query.page, 10) || 1;
    const sort = req.query.sort;
    const query = req.query.query;
    
    // Validar que req.query.page sea un número entero válido
    if (isNaN(page) || page <= 0) {
      return res.status(400).json({ error: 'El valor de la página no es válido' });
    }
    //carrito por defecto, cambiar id hasta manejar sesiones
    const cartId = '656a5e8c9babed92494e5a52'
    try {
      const paginatedProducts = await productDao.getProducts({ limit, page, sort, query });
  
      // Renderizar la vista 'products.handlebars' con los productos paginados
      res.render('products', {
        products: paginatedProducts.payload,
        currentPage: paginatedProducts.page,
        totalPages: paginatedProducts.totalPages,
        prevLink: paginatedProducts.hasPrevPage
        ? `/products?${new URLSearchParams({ ...req.query, page: paginatedProducts.prevPage })}`
        : null,
      nextLink: paginatedProducts.hasNextPage
        ? `/products?${new URLSearchParams({ ...req.query, page: paginatedProducts.nextPage })}`
        : null,
        cartId,
        user:user
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).send('Error al obtener productos');
    }
  });


  app.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;

        //carrito por defecto, cambiar id hasta manejar sesiones
        const cartId = '656a5e8c9babed92494e5a52'

    try {
        // Obtener el producto por su ID usando la lógica en productDao
        const product = await productDao.getProductById(productId);

        // Renderizar la vista 'productDetails.handlebars' con la información del producto
        res.render('productDetails', { product, cartId });
    } catch (error) {
        // Manejar errores
        console.error('Error al obtener producto por ID:', error);
        res.status(500).send('Error al obtener producto');
    }
});



  app.post('/cart/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    
    //Como aún no trabajamos con sesiones paso un :cid
    // por defecto, hay que cambiarlo segun los q tengamos en bd
    if(!cid){
      cid = '656a5e8c9babed92494e5a52'
    }
  
    try {
      // Llamar a la función addToCart en el CartDao
  
      await cartDao.addToCart(pid, cid);
  
      // Redirigir a la página de productos con un mensaje de éxito
      res.redirect('/products?successMessage=Producto agregado al carrito');
    } catch (error) {
      // Redirigir con un mensaje de error si es necesario
      res.redirect('/products?errorMessage=Error al agregar al carrito');
    }
  });




  app.get('/cart/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        // Obtener el contenido del carrito usando la lógica en cartDao
        const cartInfo = await cartDao.getCartContents(cid);

        // Renderizar la vista 'cart.handlebars' con la información del carrito
        res.render('cart', { cartInfo });
    } catch (error) {
        // Manejar errores y redirigir con un mensaje de error si es necesario
        console.error('Error al obtener el carrito:', error);
        res.redirect('/products?errorMessage=Error al obtener el carrito');
    }
});

  // Iniciar el servidor
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log("listening at ", PORT);
  });
});












// // Ruta para la vista de productos en tiempo real
// app.get('/realtimeproducts', (req, res) => {
//   // Renderiza la vista realtimeProducts.handlebars
//   res.render('realtimeProducts');
// });

// io.on('connection', (socket) => {
//   console.log('Cliente conectado');
//   // Puedes agregar lógica adicional para manejar eventos de socket aquí
// });


// io.on('disconnect', (socket) => {
//   console.log('Cliente desconectado');
// });

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
import ProductManager from './managers/ProductManager.js';
import { errorHandler } from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
// const io = socketIO(server);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Handlebars

app.engine('handlebars', engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Conectar a la base de datos antes de configurar las rutas
connectToDataBase().then(() => {
  // Rutas
  app.use('/api', routes);

  // Middleware de errores
  app.use(errorHandler);

  // Ruta para la vista Home.handlebars
  const productManager = new ProductManager()
  app.get('/', (req, res) => {
    // Renderiza la vista home.handlebars
    const products = productManager.getProducts();
    res.render('home', { products });
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

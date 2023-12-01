import '../src/db/connectionDataBase.js';
import express from 'express';
import { json, urlencoded } from 'express';
import { engine } from 'express-handlebars'
import http from 'http';
// import socketIO from 'socket.io';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from './routes/index';
import ProductManager from './managers/ProductManager.js';
import { errorHandler } from './middlewares/errorHandler.js';

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


// Rutas
app.use('/api', routes)

//Middleware errores
app.use(errorHandler)




// Ruta para la vista Home.handlebars
const productManager = new ProductManager()
app.get('/', (req, res) => {
  // Renderiza la vista home.handlebars
  const products = productManager.getProducts();
  res.render('home', { products });
});


export { server };













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

import express from 'express';
import exphbs from 'express-handlebars';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { json, urlencoded } from 'express';
import routes from './routes/index';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // Configurar Handlebars
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));


// Agregar los enrutadores
app.use('/api', routes)

// // Ruta para la vista Home
// app.get('/', (req, res) => {
//   // Renderiza la vista home.handlebars
//   res.render('home');
// });

// // Ruta para la vista de productos en tiempo real
// app.get('/realtimeproducts', (req, res) => {
//   // Renderiza la vista realtimeProducts.handlebars
//   res.render('realtimeProducts');
// });

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  // Puedes agregar lógica adicional para manejar eventos de socket aquí
});


io.on('disconnect', (socket) => {
  console.log('Cliente desconectado');
});

// module.exports = { app, server, io };
export { app, server, io };

import { Router } from 'express';
import cartRouter from './cartRouter.js';
import productRouter from './productRouter.js';

const routes = Router();

routes.use('/cart', cartRouter)
routes.use('/products', productRouter)

export default routes;
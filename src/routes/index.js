import { Router } from 'express';
import cartRouter from './cartRouter';
import productRouter from './productRouter';

const routes = Router();

routes.use('/cart', cartRouter)
routes.use('/products', productRouter)

export default routes;
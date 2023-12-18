import { Router } from 'express';
import cartRouter from './cartRouter.js';
import productRouter from './productRouter.js';
import sessionRouter from './sessionRouter.js';
import { requireAuth } from '../middlewares/auth.js';
const routes = Router();

routes.use('/cart', requireAuth, cartRouter);
routes.use('/products',requireAuth, productRouter);
routes.use('/userSession', sessionRouter);

export default routes;
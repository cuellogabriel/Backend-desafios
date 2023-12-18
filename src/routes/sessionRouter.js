import { Router } from 'express';
import { register, login, logout } from '../controllers/usersControllers.js';
import { requireAuth } from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/register', register);
sessionRouter.post('/login', login);
sessionRouter.post('/logout',requireAuth, logout);



export default sessionRouter;
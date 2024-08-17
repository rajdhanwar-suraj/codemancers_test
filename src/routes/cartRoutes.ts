import express from 'express';
import { addToCart, getCartItems } from '../controllers/cartController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').post(authMiddleware, addToCart).get(authMiddleware, getCartItems);

export default router;

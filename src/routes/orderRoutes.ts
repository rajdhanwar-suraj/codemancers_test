import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').post(authMiddleware, createOrder).get(authMiddleware, getOrders);

export default router;

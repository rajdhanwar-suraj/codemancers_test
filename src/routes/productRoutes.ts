import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').get(getProducts).post(authMiddleware, createProduct);
router.route('/:id').get(getProductById);

export default router;

import express from 'express';
import { registerUser, authUser, getUserProfile } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', authMiddleware, getUserProfile);

export default router;

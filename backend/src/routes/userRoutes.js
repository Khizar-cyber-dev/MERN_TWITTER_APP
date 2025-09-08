import express from 'express';
import { getMe, login, logout, register } from '../controllers/authController.js';
import protectedRoutes from '../middleware/protectedRoutes.js';

const router = express.Router();

router.get("/me", protectedRoutes, getMe);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
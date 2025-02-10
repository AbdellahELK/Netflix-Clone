import express from 'express'
import { login, logout, signup, checkAuth } from '../controllers/authController.js';
import { protectedRoutes } from '../middlewear/protectedRoutes.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/checkAuth', protectedRoutes, checkAuth);

export default router;
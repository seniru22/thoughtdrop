import express, { Router } from 'express';
import { signup, login, logout } from '../controllers/user.controller.js'; // Use ES import syntax
import { isAuthenticated } from '../middlewares/user.middleware.js'; // Use ES import syntax

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);

export default router;

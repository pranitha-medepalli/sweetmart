import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerValidator, validate, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', loginValidator, validate, login);

export default router;


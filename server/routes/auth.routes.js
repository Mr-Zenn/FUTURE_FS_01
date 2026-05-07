import express from 'express';
import rateLimit from 'express-rate-limit';
import { login } from '../controllers/auth.controller.js';
import { authValidators, validate } from '../middleware/validate.js';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts, please try again later' },
});

router.post('/login', loginLimiter, authValidators, validate, login);

export default router;

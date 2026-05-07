import express from 'express';
import { sendMessage, getMessages, deleteMessage } from '../controllers/message.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';
import { messageValidators, validate } from '../middleware/validate.js';

const router = express.Router();

const adminGuard = [authMiddleware, roleMiddleware('admin')];

router.post('/', messageValidators, validate, sendMessage);
router.get('/', ...adminGuard, getMessages);
router.delete('/:id', ...adminGuard, deleteMessage);

export default router;

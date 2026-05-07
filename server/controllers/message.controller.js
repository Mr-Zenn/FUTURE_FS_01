import asyncHandler from '../utils/asyncHandler.js';
import * as messageService from '../services/messageService.js';

export const sendMessage = asyncHandler(async (req, res) => {
  const msg = await messageService.createMessage(req.body);
  res.status(201).json({ success: true, message: 'Message sent', data: msg });
});

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await messageService.fetchMessages();
  res.json({ success: true, data: messages });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  await messageService.removeMessage(req.params.id);
  res.json({ success: true, message: 'Message deleted' });
});

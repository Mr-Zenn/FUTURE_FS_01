import Message from '../models/Message.js';
import ApiError from '../utils/ApiError.js';

export const createMessage = async (data) => Message.create(data);

export const fetchMessages = async () => Message.find().sort({ createdAt: -1 });

export const removeMessage = async (id) => {
  const msg = await Message.findByIdAndDelete(id);
  if (!msg) throw new ApiError(404, 'Message not found');
};

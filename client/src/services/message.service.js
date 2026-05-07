import api from './api.js';

export const sendMessage = (data) => api.post('/messages', data);
export const getMessages = () => api.get('/messages');
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

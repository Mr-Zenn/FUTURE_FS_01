import api from './api.js';

export const loginAdmin = (data) => api.post('/auth/login', data);

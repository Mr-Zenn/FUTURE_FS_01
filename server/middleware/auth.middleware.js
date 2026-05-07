import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import config from '../config/index.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new ApiError(401, 'No token provided'));

  try {
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
    next(new ApiError(401, message));
  }
};

export default authMiddleware;

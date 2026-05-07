import ApiError from '../utils/ApiError.js';

const roleMiddleware = (role) => (req, res, next) => {
  if (req.user?.role !== role) return next(new ApiError(403, 'Access denied'));
  next();
};

export default roleMiddleware;

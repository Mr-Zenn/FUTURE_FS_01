import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import config from '../config/index.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, 'User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    },
  });
});

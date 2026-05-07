import { validationResult, body } from 'express-validator';
import ApiError from '../utils/ApiError.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((e) => e.msg).join(', ');
    return next(new ApiError(422, message));
  }
  next();
};

export const authValidators = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const projectValidators = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('githubLink')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('GitHub link must be a valid URL'),
];

export const messageValidators = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
];

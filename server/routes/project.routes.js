import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/project.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';
import { projectValidators, validate } from '../middleware/validate.js';

const router = express.Router();

const adminGuard = [authMiddleware, roleMiddleware('admin')];

router.get('/', getProjects);
router.post('/', ...adminGuard, projectValidators, validate, createProject);
router.put('/:id', ...adminGuard, projectValidators, validate, updateProject);
router.delete('/:id', ...adminGuard, deleteProject);

export default router;

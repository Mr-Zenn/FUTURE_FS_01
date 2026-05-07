import asyncHandler from '../utils/asyncHandler.js';
import * as projectService from '../services/projectService.js';

export const getProjects = asyncHandler(async (req, res) => {
  const { page = 1, limit = 6, search = '' } = req.query;
  const result = await projectService.fetchProjects({
    page: Number(page),
    limit: Number(limit),
    search,
  });
  res.json({ success: true, data: result });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body);
  res.status(201).json({ success: true, message: 'Project created', data: project });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  res.json({ success: true, message: 'Project updated', data: project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  await projectService.deleteProject(req.params.id);
  res.json({ success: true, message: 'Project deleted' });
});

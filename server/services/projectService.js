import Project from '../models/Project.js';
import ApiError from '../utils/ApiError.js';

export const fetchProjects = async ({ page = 1, limit = 6, search = '' }) => {
  const query = search
    ? { $or: [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }] }
    : {};

  const [projects, total] = await Promise.all([
    Project.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Project.countDocuments(query),
  ]);

  return { projects, total, page, pages: Math.ceil(total / limit) };
};

export const createProject = async (data) => Project.create(data);

export const updateProject = async (id, data) => {
  const project = await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!project) throw new ApiError(404, 'Project not found');
  return project;
};

export const deleteProject = async (id) => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new ApiError(404, 'Project not found');
};

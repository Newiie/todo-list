import express from 'express';
import { 
    getProjects, 
    getProjectById,
    createProject,
    updateProject,
    deleteProject 
} from '../controller/projects.controller.js';

const projectsRouter = express.Router();

projectsRouter.get('/', getProjects);
projectsRouter.get('/:id', getProjectById);
projectsRouter.post('/', createProject);
projectsRouter.put('/:id', updateProject);
projectsRouter.delete('/:id', deleteProject);

export default projectsRouter;
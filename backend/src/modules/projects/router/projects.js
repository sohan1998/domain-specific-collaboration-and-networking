import express from 'express';
import { ProjectsController } from '../controller/projects.js';

const projectRouter = express.Router();
const projectController = new ProjectsController();

projectRouter.post('/projects/createProject', projectController.createProject);
projectRouter.get('/projects/viewAllProjects', projectController.viewAllProjects);
projectRouter.get('/projects/viewParticularProject', projectController.viewParticularProject);
projectRouter.get('/projects/viewAllApplicationsForParticularProject', projectController.viewAllApplicationsForParticularProject);
projectRouter.get('/projects/viewRolesOfParticularProject', projectController.viewRolesOfParticularProject);
export default projectRouter;

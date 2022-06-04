import express from 'express';
import { ProjectController } from '../controller/projects';

const projectController = new ProjectController();
const projectRouter = express.Router();

projectRouter.post('/projects/createProject', ProjectController.createProject);
projectRouter.get('/projects/viewAllProjects', ProjectController.viewAllProjects);
projectRouter.get('/projects/viewParticularProject',ProjectController.viewParticularProject);
projectRouter.post('/projects/changeStatusProject',ProjectController.changeStatusProject);

export default projectRouter;
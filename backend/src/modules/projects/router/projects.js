import express from 'express';
import { ProjectsController } from '../controller/projects.js';

const projectRouter = express.Router();
const projectController = new ProjectsController();

projectRouter.post('/projects/createProject', projectController.createProject);
projectRouter.get('/projects/viewAllProjects', projectController.viewAllProjects);
projectRouter.get('/projects/viewParticularProject', projectController.viewParticularProject);
// projectRouter.post('/projects/changeStatusProject', projectController.changeStatusProject);
projectRouter.get('/projects/displayProjectDescription', projectController.displayProjectDescription);
projectRouter.get('/projects/displayProjectTitle', projectController.displayProjectTitle);
projectRouter.get('/projects/viewAllMembers', projectController.viewAllMembers);
projectRouter.get('/projects/viewAllApplications', projectController.viewAllApplications);
projectRouter.get('/projects/viewAllRoles', projectController.viewAllRoles);
export default projectRouter;

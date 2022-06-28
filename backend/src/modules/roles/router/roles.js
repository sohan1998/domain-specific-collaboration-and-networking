import express from 'express';
import { RolesController } from '../controller/roles.js';

const roleRouter = express.Router();
const roleController = new RolesController();

roleRouter.post('/roles/createJob', roleController.createJob);
roleRouter.get('/roles/viewParticularJob', roleController.viewParticularJob);
roleRouter.post('/roles/applyParticularJob', roleController.applyParticularJob);
roleRouter.get('/roles/appliedJob', roleController.appliedJob);
roleRouter.get('/roles/viewAllJobs', roleController.viewAllJobs);

export default roleRouter;

import express from 'express';
import { ProfileController } from '../controller/profile.js';

const profileRouter = express.Router();
const profileController = new ProfileController();

profileRouter.get('/profile/getUserProfile', profileController.getUserProfile);
profileRouter.put('/profile/editUserDetails', profileController.editUserDetails);
export default profileRouter;

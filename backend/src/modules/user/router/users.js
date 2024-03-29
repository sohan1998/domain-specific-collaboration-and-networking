import express from 'express';
import { UserController } from '../controller/users.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/user/loginUser', userController.login);
userRouter.post('/user/registerUser', userController.register);
userRouter.get('/user/validateRegisteredUser', userController.validateRegisteredUser);
userRouter.post('/user/userConnections', userController.userConnections);
userRouter.get('/user/existingProjectsOfUser', userController.existingProjectsOfUser);

export default userRouter;

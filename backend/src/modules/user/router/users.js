import express from 'express';
import { UserController } from '../controller/users.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/user/loginUser', userController.login);
userRouter.post('/user/registerUser', userController.register);

export default userRouter;

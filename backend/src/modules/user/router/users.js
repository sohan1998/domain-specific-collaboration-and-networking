import express from 'express';
import { UserController } from '../controller/users.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/user/loginUser', UserController.login);
userRouter.post('/user/registerUser', UserController.register);

export default userRouter;

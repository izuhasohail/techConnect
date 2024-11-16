import express from 'express';
import { signup, login, verifyEmail } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/verify-email', verifyEmail);

export default userRouter;
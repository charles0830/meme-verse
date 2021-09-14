import express, { Router } from 'express';
import { loginUser, registerUser } from '../controller/UserController';

const router: Router = express.Router();
// user register
router.route('/register').post(registerUser);
// user login
router.route('/login').post(loginUser);

export default router;

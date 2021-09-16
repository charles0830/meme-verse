import express, { Router } from 'express';
import {
  getProfile,
  getUserMemes,
  loginUser,
  registerUser,
} from '../controller/UserController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();
// user register
router.route('/register').post(registerUser);
// user login
router.route('/login').post(loginUser);
// fetch profile info
router.route('/getUserMemes').get(protect, getUserMemes);
// fetch profile info
router.route('/:userId').get(protect, getProfile);

export default router;

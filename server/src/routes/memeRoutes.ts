import express, { Router } from 'express';
import { createMeme, deleteMeme, getMemes } from '../controller/MemeController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();
// user register
router.route('/').post(protect, createMeme).get(protect, getMemes);
router.route('/:memeId').delete(protect, deleteMeme);

export default router;

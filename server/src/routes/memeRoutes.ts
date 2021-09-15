import express, { Router } from 'express';
import {
  commentOnMeme,
  createMeme,
  deleteMeme,
  getMemes,
} from '../controller/MemeController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

// create meme & get memes
router.route('/').post(protect, createMeme).get(protect, getMemes);
// comment on meme
router.route('/:memeId/comment').post(protect, commentOnMeme);
// delete meme
router.route('/:memeId').delete(protect, deleteMeme);

export default router;

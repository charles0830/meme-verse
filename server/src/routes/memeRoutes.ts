import express, { Router } from 'express';
import {
  commentOnMeme,
  createMeme,
  deleteMeme,
  getComments,
  getMeme,
  getMemes,
  likeMeme,
} from '../controller/MemeController';
import { protect } from '../middleware/authMiddleware';

const router: Router = express.Router();

// create meme & get memes
router.route('/').post(protect, createMeme).get(protect, getMemes);
// comment on meme
router
  .route('/:memeId/comments')
  .post(protect, commentOnMeme)
  .get(protect, getComments);
// delete meme
router.route('/:memeId').delete(protect, deleteMeme).get(protect, getMeme);
// like a meme
router.route('/:memeId/like').put(protect, likeMeme);

export default router;

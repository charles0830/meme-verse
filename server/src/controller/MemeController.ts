import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import CommentModel from '../models/CommentModel';
import MemeModel from '../models/MemeModel';

// desc: create meme
// method: POST
export const createMeme = asyncHandler(async (req: Request, res: Response) => {
  const { image } = req.body;
  const newMeme = await MemeModel.create({ image, user: req.user._id });
  if (newMeme) {
    res.status(201).json(newMeme);
  } else {
    res.status(500);
    throw new Error('Failed to create meme!');
  }
});
// desc: get all memes
// method: GET
export const getMemes = asyncHandler(async (req: Request, res: Response) => {
  const memes = await MemeModel.find({})
    .sort({ createdAt: -1 })
    .populate('user');
  if (memes) {
    const comments = await Promise.all(
      memes?.map(async (meme: any) => {
        try {
          const cmnst = await CommentModel.countDocuments({
            memeId: meme?._id,
          });
          if (cmnst) {
            return cmnst;
          } else {
            return 0;
          }
        } catch (error) {
          console.log(error);
        }
      })
    );
    interface MType {
      meme: any;
      totalComments: any;
    }
    const memesWithCount: MType[] = [];

    memes.forEach(async (meme, idx) => {
      memesWithCount.push({
        meme: meme,
        totalComments: comments[idx],
      });
    });

    res.status(200).json(memesWithCount);
  } else {
    res.status(500);
    throw new Error('Meme not found!');
  }
});
// desc: delete a meme
// method: GET
export const deleteMeme = asyncHandler(async (req: Request, res: Response) => {
  const memeId = req.params.memeId;
  const meme = await MemeModel.findById(memeId);
  if (meme) {
    if (meme.user.toString() === req.user._id.toString()) {
      await meme.remove();
      res.status(200).json(meme);
    } else {
      res.status(403);
      throw new Error('You are not authorized to delte this!');
    }
  } else {
    res.status(404);
    throw new Error('Item not found!');
  }
});
// desc: comment on meme
// method: POST
export const commentOnMeme = asyncHandler(
  async (req: Request, res: Response) => {
    const memeId = req.params.memeId;
    const meme = await MemeModel.findById(memeId);
    if (meme) {
      const { comment } = req.body;

      const newComment = await CommentModel.create({
        memeId,
        comment,
        userId: req.user._id,
      });

      if (newComment) {
        res.status(201).json(newComment);
      } else {
        res.status(500);
        throw new Error('Failed to comment on meme!');
      }
    } else {
      res.status(404);
      throw new Error('Item not found!');
    }
  }
);

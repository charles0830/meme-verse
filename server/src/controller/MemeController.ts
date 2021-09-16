import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import fs from 'fs';
import path from 'path';
import CommentModel from '../models/CommentModel';
import LikeModel from '../models/LikeModel';
import MemeModel from '../models/MemeModel';

// desc: create meme
// method: POST
export const createMeme = asyncHandler(async (req: Request, res: Response) => {
  const { image } = req.body;
  const newMeme = await MemeModel.create({ image, user: req.user._id });
  if (newMeme) {
    res.status(201).json({ meme: newMeme, totoalComments: 0 });
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
// method: DELETE
export const deleteMeme = asyncHandler(async (req: Request, res: Response) => {
  const memeId = req.params.memeId;
  const meme = await MemeModel.findById(memeId);
  if (meme) {
    if (meme.user.toString() === req.user._id.toString()) {
      // delete memes like
      await LikeModel.deleteMany({ memeId: meme._id });
      // delete meme comments
      await CommentModel.deleteMany({ memeId: meme._id });
      await meme.remove();

      // delete image file from dir
      // if (meme.image.includes('uploads')) {
      //   fs.unlink(
      //     path.join('./' + `/uploads/${meme.image.split('/')[1]}`),
      //     (err) => {
      //       if (err) {
      //         console.log(err);
      //       } else {
      //         console.log('meme deleted!');
      //       }
      //     }
      //   );
      // }

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
// desc: get a meme
// method: GET
export const getMeme = asyncHandler(async (req: Request, res: Response) => {
  const memeId = req.params.memeId;
  const meme = await MemeModel.findById(memeId).populate('user');
  if (meme) {
    // get like status
    let likeStatus: number = 0;
    const like = await LikeModel.findOne({ memeId, userId: req.user._id });
    if (like) {
      likeStatus = 1;
    }

    const m = {
      _id: meme._id,
      image: meme.image,
      like: meme.like,
      user: meme.user,
      likeStatus,
    };
    res.status(200).json(m);
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
// desc: get comments
// method: GET
export const getComments = asyncHandler(async (req: Request, res: Response) => {
  const memeId = req.params.memeId;
  const meme = await MemeModel.findById(memeId);
  if (meme) {
    const comments = await CommentModel.find({ memeId: memeId }).exec();
    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(500);
      throw new Error('Comment failed!');
    }
  } else {
    res.status(404);
    throw new Error('Item not found!');
  }
});
// desc: like meme
// method: PUT
export const likeMeme = asyncHandler(async (req: Request, res: Response) => {
  const memeId = req.params.memeId;
  const meme = await MemeModel.findById(memeId).populate('user');
  if (meme) {
    const like = await LikeModel.findOne({ memeId, userId: req.user._id });
    if (like) {
      await like.remove();
      meme.like = meme.like - 1;
      await meme.save();
      // get like status
      const m = {
        _id: meme._id,
        image: meme.image,
        like: meme.like,
        user: meme.user,
        likeStatus: 0,
      };
      res.status(200).json(m);
    } else {
      await LikeModel.create({
        memeId,
        status: 1,
        userId: req.user._id,
      });
      meme.like = meme.like + 1;
      await meme.save();
      const m = {
        _id: meme._id,
        image: meme.image,
        like: meme.like,
        user: meme.user,
        likeStatus: 1,
      };
      res.status(200).json(m);
    }
  } else {
    res.status(404);
    throw new Error('Item not found!');
  }
});

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/UserModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import MemeModel from '../models/MemeModel';
import CommentModel from '../models/CommentModel';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// desc: register user
// method: POST
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const userExistWithEmail = await UserModel.findOne({ email });
    const userExistWithUsername = await UserModel.findOne({ username });
    if (!userExistWithEmail) {
      if (!userExistWithUsername) {
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
          username,
          email,
          password: hashPassword,
        });

        if (newUser) {
          res.status(201).json({
            _id: newUser._id,
            token: await generateToken(newUser._id),
          });
        } else {
          res.status(500);
          throw new Error('Registration failed!');
        }
      } else {
        res.status(403);
        throw new Error('Username taken!');
      }
    } else {
      res.status(403); // forbidden
      throw new Error('Email already used!');
    }
  }
);
// desc: login user
// method: POST
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body;

  const user = await UserModel.findOne(
    usernameOrEmail.includes('@')
      ? { email: usernameOrEmail }
      : { username: usernameOrEmail }
  ).select('password');
  if (user) {
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      res.status(200).json({
        _id: user._id,
        token: await generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid password!');
    }
  } else {
    res.status(404);
    throw new Error('Invalid email or username!');
  }
});
// desc: get user profile
// method: POST
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await UserModel.findById(userId);
  if (user) {
    if (user._id.toString() === req.user._id.toString()) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(403);
      throw new Error('You are not authorized to do this!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc: get user memes
// method: GET
export const getUserMemes = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const memes = await MemeModel.find({ user: userId })
      .populate('user')
      .sort({ createdAt: -1 });
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
      throw new Error('Failed to fetch user memes!');
    }
  }
);
// desc: Get reset password link
// method: PUT
export const getResetPasswordLink = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      const token = jwt.sign(
        { id: user._id },
        process.env.EMAIL_SECRET as string,
        {
          expiresIn: '30min',
        }
      );

      // const url = `http://localhost:3000/createNewPassword/${token}`;    //localhost
      const url = `${process.env.PROD_CLIENT}/reset-password/${token}`;

      const emailSent = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset Password | MemeVerse',
        text: 'Reset your password',
        html: `<p>Please click this link to reset password. <a href="${url}">${url}</a></p>`,
      });
      if (emailSent) {
        res.status(201).json({
          status: 'Email sent.',
          message: `Password reset link was sent to ${email}.`,
        });
      } else {
        res.status(403);
        throw new Error('Password reset failed, Email sending failed!');
      }
    } else {
      res.status(403);
      throw new Error('There is no account associated with this email!');
    }
  }
);
// reset password from link
export const resetPasswordFromLink = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = jwt.verify(
      req.params.token,
      process.env.EMAIL_SECRET as string
    ) as { id: string };
    const user = await UserModel.findById(id);
    if (user) {
      let { newPass, conPass } = req.body;
      if (newPass === conPass) {
        user.password = await bcrypt.hash(newPass, 10);
        await user.save();
        res.status(200);
        res.json({ message: 'Password reset successfully!' });
      } else {
        res.status(403);
        throw new Error('Password does not match!');
      }
    } else {
      res.status(404);
      throw new Error('User not found!');
    }
  }
);

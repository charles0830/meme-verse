import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/UserModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';

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
    throw new Error('USer not found!');
  }
});

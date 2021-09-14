import jwt, { Secret } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/UserModel';

interface docodedValue {
  id: string;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const { id } = jwt.verify(
          token,
          process.env.JWT_SECRET as Secret
        ) as docodedValue;
        req.user = await UserModel.findById(id).select('-password');
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authirized! Token failed.');
      }
    }
    if (!token) {
      res.status(401);
      throw new Error('Not authorized! No Token');
    }
  }
);

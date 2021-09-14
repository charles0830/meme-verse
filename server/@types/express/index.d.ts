import UserModel from '../../src/models/UserModel';

declare global {
  namespace Express {
    interface Request {
      user: UserModel;
    }
  }
}

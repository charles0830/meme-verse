import { model, Schema } from 'mongoose';

interface User {
  username: string;
  email: string;
  password: string;
}

const schema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<User>('User', schema);

export default UserModel;

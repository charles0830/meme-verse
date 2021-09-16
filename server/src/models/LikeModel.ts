import { model, Schema } from 'mongoose';

interface Like {
  memeId: string;
  userId: string;
  status: number;
}

const schema = new Schema<Like>(
  {
    memeId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = model<Like>('Like', schema);

export default LikeModel;

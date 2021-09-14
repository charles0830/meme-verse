import { model, Schema, Types } from 'mongoose';

interface Comment {
  memeId: typeof Types.ObjectId;
  comment: string;
  userId: typeof Types.ObjectId;
}

const schema = new Schema<Comment>(
  {
    memeId: {
      type: Types.ObjectId,
      ref: 'Meme',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model<Comment>('Comment', schema);

export default CommentModel;

import { model, Schema, Types } from 'mongoose';

interface Comment {
  memeId: any;
  comment: string;
  userId: string;
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
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model<Comment>('Comment', schema);

export default CommentModel;

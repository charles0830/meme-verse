import { model, Schema, Types } from 'mongoose';

interface Meme {
  image: string;
  like: number;
  user: any;
}

const schema = new Schema<Meme>(
  {
    image: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const MemeModel = model<Meme>('Meme', schema);

export default MemeModel;

export type UserType = { _id: string; username: string; email: string };

export type MemeType = {
  _id: string;
  image: string;
  like: number;
  user: UserType;
  likeStatus: number;
};

export type CommentType = {
  _id: string;
  memeId: string;
  comment: string;
  user: string;
  createdAt: string;
};
